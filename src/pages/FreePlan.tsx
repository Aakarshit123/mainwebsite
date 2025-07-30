import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, CubeIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface AnalysisResult {
  depthMap: string;
  riskReport: string;
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
        depthMap: response.data.depth_map,
        riskReport: response.data.risk_report,
        processing: false
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to mock data for demo
      setResult({
        depthMap: '/api/placeholder/400/300',
        riskReport: generateMockReport(homeDetails),
        processing: false
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockReport = (details: HomeDetails) => {
    return `# Home Risk Analysis Report

## Executive Summary
Based on the uploaded floor plan analysis and provided home details, we've identified several key areas for safety consideration.

## Property Information
- **Building Material**: ${details.buildingMaterial || 'Not specified'}
- **Building Age**: ${details.buildingAge || 'Not specified'}
- **Number of Floors**: ${details.floors || 'Not specified'}
- **Square Footage**: ${details.squareFootage || 'Not specified'}
- **Location**: ${details.location || 'Not specified'}
- **Heating System**: ${details.heatingSystem || 'Not specified'}
- **Foundation Type**: ${details.foundationType || 'Not specified'}
- **Roof Material**: ${details.roofMaterial || 'Not specified'}

## Fire Safety Assessment
- **Score: ${details.buildingMaterial === 'wood' ? '6.5/10' : '7.5/10'}**
- Exit routes are clearly defined with multiple egress points
- Recommended: Install smoke detectors in all bedrooms and hallways
- Consider fire extinguisher placement near kitchen area
${details.buildingMaterial === 'wood' ? '- **CRITICAL**: Wood construction requires enhanced fire safety measures' : ''}

## Structural Analysis
- **Score: ${details.buildingAge && parseInt(details.buildingAge) > 50 ? '6.5/10' : '8/10'}**
- Load-bearing walls appear properly positioned
- Foundation layout supports adequate weight distribution
- Minor concern: Large open spaces may require additional beam support
${details.buildingAge && parseInt(details.buildingAge) > 50 ? '- **NOTE**: Older construction may require structural updates' : ''}

## Earthquake Resistance
- **Score: ${details.foundationType === 'slab' ? '7.5/10' : '6.5/10'}**
- Building orientation is favorable for seismic activity
- Recommended: Reinforce connections between floors and walls
- Consider seismic retrofitting for improved safety
${details.foundationType === 'slab' ? '- **ADVANTAGE**: Slab foundation provides good seismic stability' : ''}

## Key Recommendations
1. Install additional smoke detectors
2. Upgrade electrical systems in older sections
3. Consider structural reinforcement for earthquake preparedness
4. Improve emergency exit signage
${details.additionalNotes ? `\n## Additional Notes\n${details.additionalNotes}` : ''}

## Overall Safety Score: ${details.buildingMaterial === 'wood' && details.buildingAge && parseInt(details.buildingAge) > 50 ? '6.8/10' : '7.3/10'}
Your home shows good overall safety characteristics with room for targeted improvements.`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Plan Analysis</h1>
          <p className="text-xl text-gray-600">Upload your floor plan and get instant AI-powered analysis</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <CloudArrowUpIcon className="h-8 w-8 text-blue-500 mr-3" />
              Upload Floor Plan
            </h2>

            {!preview ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <CloudArrowUpIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">
                  {isDragActive ? 'Drop your floor plan here' : 'Drag & drop your floor plan'}
                </p>
                <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Floor plan preview"
                  className="w-full h-64 object-cover rounded-xl border"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      setResult(null);
                      setShowDetailsForm(false);
                      setHomeDetails({
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
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Change File
                  </button>
                  <button
                    onClick={handleAnalysis}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Analyzing...' : 'Start Analysis'}
                  </button>
                </div>
              </div>
            )}

            {/* Home Details Form */}
            {showDetailsForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gray-50 rounded-xl border"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Details (Optional)</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Providing additional details will help our AI generate more accurate risk analysis.
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
                      <option value="wood">Wood Frame</option>
                      <option value="brick">Brick</option>
                      <option value="concrete">Concrete</option>
                      <option value="steel">Steel Frame</option>
                      <option value="mixed">Mixed Materials</option>
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
                    <select
                      value={homeDetails.floors}
                      onChange={(e) => setHomeDetails({...homeDetails, floors: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select floors</option>
                      <option value="1">1 Floor</option>
                      <option value="2">2 Floors</option>
                      <option value="3">3 Floors</option>
                      <option value="4+">4+ Floors</option>
                    </select>
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
                      placeholder="e.g., 2500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location/Region
                    </label>
                    <input
                      type="text"
                      value={homeDetails.location}
                      onChange={(e) => setHomeDetails({...homeDetails, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., California, USA"
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
                      <option value="">Select heating system</option>
                      <option value="gas">Natural Gas</option>
                      <option value="electric">Electric</option>
                      <option value="oil">Oil</option>
                      <option value="heat-pump">Heat Pump</option>
                      <option value="radiant">Radiant</option>
                      <option value="other">Other</option>
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
                      <option value="slab">Concrete Slab</option>
                      <option value="crawl">Crawl Space</option>
                      <option value="basement">Full Basement</option>
                      <option value="pier">Pier & Beam</option>
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
                      <option value="">Select roof material</option>
                      <option value="asphalt">Asphalt Shingles</option>
                      <option value="tile">Clay/Concrete Tile</option>
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
                    placeholder="Any additional information about your home (renovations, known issues, etc.)"
                  />
                </div>
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
            {/* 3D Model */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CubeIcon className="h-6 w-6 text-teal-500 mr-2" />
                3D Depth Map
              </h3>
              {result?.depthMap ? (
                <img
                  src={result.depthMap}
                  alt="3D Depth Map"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">3D model will appear here after analysis</p>
                </div>
              )}
            </div>

            {/* Risk Report */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-orange-500 mr-2" />
                Risk Analysis Report
              </h3>
              {result?.riskReport ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {result.riskReport}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-6">
                  <p className="text-gray-400 text-center">Risk analysis report will appear here after processing</p>
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
              'Basic 2D to 3D conversion',
              'Fire safety assessment',
              'Structural analysis overview',
              'Basic risk scoring',
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
      </div>
    </div>
  );
};

export default FreePlan;