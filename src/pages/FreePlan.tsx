import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, EyeIcon, DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface AnalysisResult {
  visualization: string;
  analysis: {
    risk_score: number;
    risks: string[];
    recommendations: string[];
    analysis_report: string;
    image_analysis: {
      dimensions: string;
      aspect_ratio: number;
      edge_density: number;
      brightness: number;
      contrast: number;
    };
  };
  processing: boolean;
}

interface HomeDetails {
  buildingMaterial: string;
  buildingAge: string;
  floors: string;
  squareFootage: string;
  location: string;
  heatingSystem: string;
  foundationType: string;
  roofMaterial: string;
  additionalNotes: string;
}

const FreePlan: React.FC = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [homeDetails, setHomeDetails] = useState<HomeDetails>({
    buildingMaterial: '',
    buildingAge: '',
    floors: '',
    squareFootage: '',
    location: '',
    heatingSystem: '',
    foundationType: '',
    roofMaterial: '',
    additionalNotes: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [savedBuildings, setSavedBuildings] = useState<HomeDetails[]>(() => {
    const data = localStorage.getItem('savedBuildings');
    return data ? JSON.parse(data) : [];
  });
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setShowDetailsForm(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleAnalysis = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('homeDetails', JSON.stringify(homeDetails));

      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult({
        visualization: response.data.visualization,
        analysis: response.data.analysis,
        processing: false
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('AI analysis failed. Please try again later or check your image.');
      // Fallback to mock data for demo
      setResult({
        visualization: preview || '/api/placeholder/400/300',
        analysis: generateMockAnalysis(homeDetails),
        processing: false
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockAnalysis = (details: HomeDetails) => {
    const riskScore = Math.floor(Math.random() * 40) + 20; // 20-60 range for demo
    return {
      risk_score: riskScore,
      risks: [
        "Building age may indicate outdated electrical systems",
        "Wooden construction requires enhanced fire safety measures",
        "Consider professional structural inspection"
      ],
      recommendations: [
        "Install comprehensive smoke detection system",
        "Schedule electrical system inspection",
        "Consider fire suppression system installation"
      ],
      analysis_report: `AI IMAGE ANALYSIS REPORT

PROPERTY DETAILS:
- Building Material: ${details.buildingMaterial || 'Not specified'}
- Building Age: ${details.buildingAge || 'Not specified'}
- Number of Floors: ${details.floors || 'Not specified'}
- Square Footage: ${details.squareFootage || 'Not specified'}
- Location: ${details.location || 'Not specified'}
- Heating System: ${details.heatingSystem || 'Not specified'}
- Foundation Type: ${details.foundationType || 'Not specified'}
- Roof Material: ${details.roofMaterial || 'Not specified'}

IMAGE ANALYSIS:
- Image Dimensions: 800x600 pixels
- Aspect Ratio: 1.33
- Edge Density: 0.045
- Brightness Level: 127.3
- Contrast Level: 45.2

RISK ASSESSMENT:
Risk Score: ${riskScore}/100 (${riskScore > 40 ? 'Medium' : 'Low'} Risk)

IDENTIFIED RISKS:
• Building age may indicate outdated electrical systems
• Wooden construction requires enhanced fire safety measures
• Consider professional structural inspection

RECOMMENDATIONS:
• Install comprehensive smoke detection system
• Schedule electrical system inspection
• Consider fire suppression system installation

ADDITIONAL NOTES:
${details.additionalNotes || 'No additional notes provided'}

This analysis is based on AI image processing and should be supplemented with professional inspections for critical decisions.`,
      image_analysis: {
        dimensions: "800x600",
        aspect_ratio: 1.33,
        edge_density: 0.045,
        brightness: 127.3,
        contrast: 45.2
      }
    };
  };

  const getRiskLevelColor = (score: number) => {
    if (score > 70) return 'text-red-600';
    if (score > 40) return 'text-orange-600';
    return 'text-green-600';
  };

  const getRiskLevelText = (score: number) => {
    if (score > 70) return 'High Risk';
    if (score > 40) return 'Medium Risk';
    return 'Low Risk';
  };

  const saveBuildingProfile = () => {
    const newBuildings = [...savedBuildings, homeDetails];
    setSavedBuildings(newBuildings);
    localStorage.setItem('savedBuildings', JSON.stringify(newBuildings));
  };
  const handleSelectBuilding = (index: number) => {
    setSelectedBuildingIndex(index);
    setHomeDetails(savedBuildings[index]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the free plan features.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <img src="/assets/images/logo.jpeg" alt="Plan2Protect Logo" className="h-20 w-auto object-contain" />
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your property images and get instant AI-powered risk assessment with personalized recommendations for safety improvements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {/* File Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CloudArrowUpIcon className="h-6 w-6 text-blue-500 mr-2" />
                Upload Property Image
              </h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600">Drop the image here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag & drop your property image here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: PNG, JPG, JPEG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Home Details Form */}
            {showDetailsForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Property Details (Optional)
                </h3>
                <p className="text-gray-600 mb-6">
                  Provide additional details for more accurate analysis
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building Material
                    </label>
                    <select
                      value={homeDetails.buildingMaterial}
                      onChange={(e) => setHomeDetails({...homeDetails, buildingMaterial: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select material</option>
                      <option value="wood">Wood</option>
                      <option value="concrete">Concrete</option>
                      <option value="steel">Steel</option>
                      <option value="brick">Brick</option>
                      <option value="stone">Stone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building Age (years)
                    </label>
                    <input
                      type="number"
                      value={homeDetails.buildingAge}
                      onChange={(e) => setHomeDetails({...homeDetails, buildingAge: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      value={homeDetails.floors}
                      onChange={(e) => setHomeDetails({...homeDetails, floors: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Square Footage
                    </label>
                    <input
                      type="number"
                      value={homeDetails.squareFootage}
                      onChange={(e) => setHomeDetails({...homeDetails, squareFootage: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 2000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={homeDetails.location}
                      onChange={(e) => setHomeDetails({...homeDetails, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., California"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heating System
                    </label>
                    <select
                      value={homeDetails.heatingSystem}
                      onChange={(e) => setHomeDetails({...homeDetails, heatingSystem: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select system</option>
                      <option value="gas">Gas</option>
                      <option value="electric">Electric</option>
                      <option value="oil">Oil</option>
                      <option value="heat pump">Heat Pump</option>
                      <option value="solar">Solar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foundation Type
                    </label>
                    <select
                      value={homeDetails.foundationType}
                      onChange={(e) => setHomeDetails({...homeDetails, foundationType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select foundation</option>
                      <option value="slab">Slab</option>
                      <option value="basement">Basement</option>
                      <option value="crawl space">Crawl Space</option>
                      <option value="pier">Pier</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roof Material
                    </label>
                    <select
                      value={homeDetails.roofMaterial}
                      onChange={(e) => setHomeDetails({...homeDetails, roofMaterial: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select material</option>
                      <option value="asphalt">Asphalt Shingles</option>
                      <option value="metal">Metal</option>
                      <option value="slate">Slate</option>
                      <option value="wood">Wood Shingles</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    value={homeDetails.additionalNotes}
                    onChange={(e) => setHomeDetails({...homeDetails, additionalNotes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional information about your property (renovations, known issues, etc.)"
                  />
                </div>
              </motion.div>
            )}

            {/* Analyze Button */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <button
                  onClick={handleAnalysis}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Analyzing Image...' : 'Analyze Image for Risks'}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* AI Analysis Visualization */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <EyeIcon className="h-6 w-6 text-purple-500 mr-2" />
                AI Analysis Visualization
              </h3>
              {result?.visualization ? (
                <img
                  src={result.visualization}
                  alt="AI Analysis Visualization"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">AI analysis visualization will appear here</p>
                </div>
              )}
            </div>

            {/* Risk Assessment */}
            {result && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-orange-500 mr-2" />
                  Risk Assessment
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Risk Score</span>
                    <span className={`text-lg font-bold ${getRiskLevelColor(result.analysis.risk_score)}`}>
                      {result.analysis.risk_score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        result.analysis.risk_score > 70 ? 'bg-red-500' : 
                        result.analysis.risk_score > 40 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.analysis.risk_score}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm font-medium mt-1 ${getRiskLevelColor(result.analysis.risk_score)}`}>
                    {getRiskLevelText(result.analysis.risk_score)}
                  </p>
                </div>
              </div>
            )}

            {/* Risk Report */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-orange-500 mr-2" />
                AI Analysis Report
              </h3>
              {result?.analysis.analysis_report ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {result.analysis.analysis_report}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-6">
                  <p className="text-gray-400 text-center">AI analysis report will appear here after processing</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Free Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Free Plan Includes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'AI-powered image analysis',
              'Risk assessment scoring',
              'Safety recommendations',
              'Property detail analysis',
              'PDF report download',
              '1 analysis per day'
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved Building Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Saved Building Profiles</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Saved Building</label>
              <select
                value={selectedBuildingIndex !== null ? selectedBuildingIndex : ''}
                onChange={e => {
                  const idx = e.target.value === '' ? null : Number(e.target.value);
                  if (idx !== null) handleSelectBuilding(idx);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- None --</option>
                {savedBuildings.map((b, idx) => (
                  <option key={idx} value={idx}>
                    {b.buildingMaterial || 'Building'} | {b.location || 'Location'} | {b.buildingAge || 'Age'} yrs
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={saveBuildingProfile}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 md:mt-6"
            >
              Save as New Building
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreePlan;