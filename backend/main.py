from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import cv2
import base64
import io
import os
from pathlib import Path
import logging
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Plan2Protect API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def analyze_image_for_risks(image: Image.Image, home_details: dict = None) -> dict:
    """Analyze image for safety risks and provide recommendations"""
    try:
        # Get image dimensions and basic analysis
        width, height = image.size
        aspect_ratio = width / height
        
        # Convert to numpy array for analysis
        img_array = np.array(image)
        
        # Extract home details
        building_material = home_details.get('buildingMaterial', 'Not specified') if home_details else 'Not specified'
        building_age = home_details.get('buildingAge', 'Not specified') if home_details else 'Not specified'
        floors = home_details.get('floors', 'Not specified') if home_details else 'Not specified'
        square_footage = home_details.get('squareFootage', 'Not specified') if home_details else 'Not specified'
        location = home_details.get('location', 'Not specified') if home_details else 'Not specified'
        heating_system = home_details.get('heatingSystem', 'Not specified') if home_details else 'Not specified'
        foundation_type = home_details.get('foundationType', 'Not specified') if home_details else 'Not specified'
        roof_material = home_details.get('roofMaterial', 'Not specified') if home_details else 'Not specified'
        additional_notes = home_details.get('additionalNotes', '') if home_details else ''
        
        # Analyze image characteristics
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        
        # Detect edges for structural analysis
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / (width * height)
        
        # Analyze brightness and contrast
        brightness = np.mean(gray)
        contrast = np.std(gray)
        
        # Generate risk analysis based on image characteristics and home details
        risks = []
        recommendations = []
        risk_score = 0
        
        # Structural analysis based on edge density
        if edge_density > 0.1:
            risks.append("High structural complexity detected - may indicate potential structural concerns")
            recommendations.append("Consider professional structural inspection")
            risk_score += 30
        elif edge_density < 0.02:
            risks.append("Low detail in floor plan - may miss important structural elements")
            recommendations.append("Provide more detailed floor plan for accurate analysis")
            risk_score += 15
        
        # Building age analysis
        if building_age != 'Not specified':
            try:
                age = int(building_age)
                if age > 50:
                    risks.append(f"Building age ({age} years) may indicate outdated construction standards")
                    recommendations.append("Schedule comprehensive building inspection")
                    risk_score += 25
                elif age > 30:
                    risks.append(f"Building age ({age} years) - consider updating electrical and plumbing systems")
                    recommendations.append("Review and update critical systems")
                    risk_score += 15
            except ValueError:
                pass
        
        # Building material analysis
        if building_material.lower() in ['wood', 'timber']:
            risks.append("Wooden construction requires regular fire safety inspections")
            recommendations.append("Install smoke detectors and fire suppression systems")
            risk_score += 20
        elif building_material.lower() in ['concrete', 'steel']:
            risks.append("Concrete/steel construction - check for structural integrity")
            recommendations.append("Regular structural assessments recommended")
            risk_score += 10
        
        # Heating system analysis
        if heating_system.lower() in ['gas', 'oil']:
            risks.append("Gas/oil heating systems require regular maintenance and safety checks")
            recommendations.append("Annual heating system inspection and maintenance")
            risk_score += 15
        
        # Foundation analysis
        if foundation_type.lower() in ['basement', 'crawl space']:
            risks.append("Basement/crawl space foundations require moisture and structural monitoring")
            recommendations.append("Regular foundation inspections and moisture control")
            risk_score += 20
        
        # Roof material analysis
        if roof_material.lower() in ['asphalt', 'wood']:
            risks.append("Asphalt/wood roofing requires regular maintenance and replacement")
            recommendations.append("Schedule roof inspection and maintenance plan")
            risk_score += 15
        
        # Image quality analysis
        if brightness < 100:
            risks.append("Low image brightness may indicate poor lighting conditions")
            recommendations.append("Improve lighting for better image quality")
            risk_score += 10
        
        if contrast < 30:
            risks.append("Low image contrast may affect analysis accuracy")
            recommendations.append("Use higher contrast images for better analysis")
            risk_score += 10
        
        # Generate comprehensive report
        report = f"""AI IMAGE ANALYSIS REPORT

PROPERTY DETAILS:
- Building Material: {building_material}
- Building Age: {building_age}
- Number of Floors: {floors}
- Square Footage: {square_footage}
- Location: {location}
- Heating System: {heating_system}
- Foundation Type: {foundation_type}
- Roof Material: {roof_material}

IMAGE ANALYSIS:
- Image Dimensions: {width}x{height} pixels
- Aspect Ratio: {aspect_ratio:.2f}
- Edge Density: {edge_density:.3f}
- Brightness Level: {brightness:.1f}
- Contrast Level: {contrast:.1f}

RISK ASSESSMENT:
Risk Score: {risk_score}/100 ({'High' if risk_score > 70 else 'Medium' if risk_score > 40 else 'Low'} Risk)

IDENTIFIED RISKS:
{chr(10).join(f"• {risk}" for risk in risks) if risks else "• No significant risks detected in this analysis"}

RECOMMENDATIONS:
{chr(10).join(f"• {rec}" for rec in recommendations) if recommendations else "• Continue regular maintenance and monitoring"}

ADDITIONAL NOTES:
{additional_notes if additional_notes else "No additional notes provided"}

This analysis is based on AI image processing and should be supplemented with professional inspections for critical decisions.
"""
        
        return {
            "risk_score": risk_score,
            "risks": risks,
            "recommendations": recommendations,
            "analysis_report": report,
            "image_analysis": {
                "dimensions": f"{width}x{height}",
                "aspect_ratio": aspect_ratio,
                "edge_density": edge_density,
                "brightness": brightness,
                "contrast": contrast
            }
        }
        
    except Exception as e:
        logger.error(f"Error analyzing image: {e}")
        return {
            "risk_score": 0,
            "risks": ["Error analyzing image"],
            "recommendations": ["Please try uploading a different image"],
            "analysis_report": f"Error during analysis: {str(e)}",
            "image_analysis": {}
        }

def generate_analysis_visualization(image: Image.Image, analysis_result: dict) -> str:
    """Generate a visualization of the analysis results"""
    try:
        # Create a visualization image
        img_array = np.array(image)
        height, width = img_array.shape[:2]
        
        # Create overlay image
        overlay = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Add risk level color coding
        risk_score = analysis_result.get('risk_score', 0)
        if risk_score > 70:
            color = (0, 0, 255)  # Red for high risk
        elif risk_score > 40:
            color = (0, 165, 255)  # Orange for medium risk
        else:
            color = (0, 255, 0)  # Green for low risk
        
        # Create a semi-transparent overlay
        overlay = np.full((height, width, 3), color, dtype=np.uint8)
        overlay = cv2.addWeighted(img_array, 0.7, overlay, 0.3, 0)
        
        # Add text overlay
        font = cv2.FONT_HERSHEY_SIMPLEX
        cv2.putText(overlay, f"Risk Score: {risk_score}/100", (10, 30), font, 1, (255, 255, 255), 2)
        
        # Convert to base64
        _, buffer = cv2.imencode('.png', overlay)
        overlay_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return f"data:image/png;base64,{overlay_base64}"
        
    except Exception as e:
        logger.error(f"Error generating visualization: {e}")
        # Return original image as fallback
        _, buffer = cv2.imencode('.png', np.array(image))
        fallback_base64 = base64.b64encode(buffer).decode('utf-8')
        return f"data:image/png;base64,{fallback_base64}"

@app.on_event("startup")
async def startup_event():
    """Initialize application on startup"""
    logger.info("Plan2Protect API starting up...")
    logger.info("AI Image Analysis System ready")

@app.get("/")
async def root():
    return {"message": "Plan2Protect AI Image Analysis API"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Plan2Protect AI Image Analysis",
        "version": "1.0.0"
    }

@app.post("/analyze")
async def analyze_image_endpoint(
    file: UploadFile = File(...),
    homeDetails: str = Form(None)  # <-- Parse homeDetails from form
):
    """Analyze uploaded image for safety risks and provide recommendations"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Parse home details if provided
        home_details = None
        if homeDetails:
            try:
                home_details = json.loads(homeDetails)
            except json.JSONDecodeError:
                logger.warning("Invalid home details JSON format")
        
        # Perform AI analysis
        analysis_result = analyze_image_for_risks(image, home_details)
        
        # Generate visualization
        visualization = generate_analysis_visualization(image, analysis_result)
        
        return {
            "success": True,
            "analysis": analysis_result,
            "visualization": visualization,
            "message": "Image analysis completed successfully"
        }
        
    except Exception as e:
        logger.error(f"Error in analyze endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze-batch")
async def analyze_multiple_images(files: list[UploadFile] = File(...)):
    """Analyze multiple images for batch processing"""
    try:
        results = []
        
        for file in files:
            if not file.content_type.startswith('image/'):
                continue
                
            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data))
            
            analysis_result = analyze_image_for_risks(image)
            visualization = generate_analysis_visualization(image, analysis_result)
            
            results.append({
                "filename": file.filename,
                "analysis": analysis_result,
                "visualization": visualization
            })
        
        return {
            "success": True,
            "results": results,
            "total_analyzed": len(results)
        }
        
    except Exception as e:
        logger.error(f"Error in batch analysis: {e}")
        raise HTTPException(status_code=500, detail=f"Batch analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)