import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Share2, Linkedin, Facebook, CheckCircle, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import logoMain from '../assets/logo-main.png';
import signImage from '../assets/sign.png';

const Certificate = ({ student }) => {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!student) return null;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      if (certificateRef.current) {
        // Wait for images to load
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          foreignObjectRendering: false,
          onclone: (document) => {
            const element = document.getElementById('certificate-container');
            if (element) {
              element.style.letterSpacing = '0.5px';
            }
          },
          windowWidth: 1200,
          windowHeight: 900,
          scrollX: 0,
          scrollY: 0,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${student.name.replace(/\s+/g, '_')}_Certificate.pdf`);
      }
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      if (certificateRef.current) {
        // Wait for images to load
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          allowTaint: true,
          foreignObjectRendering: false,
          onclone: (document) => {
            const element = document.getElementById('certificate-container');
            if (element) {
              element.style.letterSpacing = '0.5px';
            }
          },
          windowWidth: 1200,
          windowHeight: 900,
          scrollX: 0,
          scrollY: 0,
        });
        const link = document.createElement('a');
        link.download = `${student.name.replace(/\s+/g, '_')}_Certificate.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    } catch (error) {
      console.error("Image Download Error:", error);
      alert("Failed to download Image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const shareUrl = window.location.href;

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side: Certificate Preview */}
      <div className="flex-grow flex items-center justify-center p-4 lg:p-8 overflow-auto relative z-10">
        <div className="transform scale-50 md:scale-75 lg:scale-90 origin-center transition-transform duration-300">
          <div
            id="certificate-container"
            ref={certificateRef}
            className="bg-[#ffffff] border-[16px] border-double border-[#0f172a] p-12 w-[1123px] h-[794px] shadow-2xl text-center relative overflow-hidden mx-auto font-serif"
            style={{ width: '1123px', height: '794px' }} // A4 Landscape dimensions in pixels (approx)
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <img src={logoMain} alt="" className="w-3/4 h-3/4 object-contain grayscale" />
            </div>

            <div className="absolute top-6 left-6 w-24 h-24 border-t-4 border-l-4 border-[#1e3a8a]"></div>
            <div className="absolute bottom-6 right-6 w-24 h-24 border-b-4 border-r-4 border-[#1e3a8a]"></div>
            <div className="absolute top-6 right-6 w-24 h-24 border-t-4 border-r-4 border-[#1e3a8a]"></div>
            <div className="absolute bottom-6 left-6 w-24 h-24 border-b-4 border-l-4 border-[#1e3a8a]"></div>

            <div className="relative z-10 flex flex-col items-center h-full justify-between py-2">

              {/* Header */}
              <div className="mb-2">
                <img src={logoMain} alt="SkyRek Logo" className="h-16 object-contain mb-2 mx-auto" />
                <h1 className="text-5xl font-bold text-[#0f172a] uppercase tracking-[0.2em] mb-1">
                  Certificate
                </h1>
                <p className="text-2xl text-[#475569] uppercase tracking-[0.3em]">
                  of Completion
                </p>
              </div>

              {/* Content */}
              <div className="w-full mb-2 flex-grow flex flex-col justify-center">
                <p className="text-xl text-[#6b7280] italic mb-2 tracking-wide">
                  This is to certify that
                </p>
                <h2 className="text-5xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-[#d1d5db] inline-block pb-4 px-16 min-w-[60%] tracking-wide">
                  {student.name}
                </h2>
                <p className="text-xl text-[#6b7280] italic mb-4 tracking-wide">
                  has successfully completed the course
                </p>
                <h3 className="text-4xl font-bold text-[#1e293b] leading-tight max-w-4xl mx-auto tracking-wide">
                  Artificial Intelligence &<br />
                  Machine Learning Certification
                </h3>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end w-full px-20 mb-4">
                <div className="text-center">
                  <div className="text-xl font-semibold text-[#0f172a] pt-2 px-10 min-w-[240px] tracking-widest">
                    {currentDate}
                  </div>
                  <p className="text-sm text-[#6b7280] mt-2 uppercase tracking-wider">Date of Issue</p>
                </div>

                <div className="text-center">
                  <div className="flex flex-col items-center justify-end h-24 pt-2 px-10 min-w-[240px] relative">
                    <img src={signImage} alt="Signature" className="absolute bottom-2 h-20 object-contain" />
                  </div>
                  <p className="text-sm text-[#6b7280] mt-2 uppercase tracking-wider">Instructor Signature</p>
                  <div className="mt-1">
                    <p className="text-xs font-bold text-[#1e293b] tracking-wide">Sehan Deemantha Arandara</p>
                    <p className="text-[10px] text-[#6b7280] tracking-wide">BSc (Hons) IT, Software Engineer</p>
                  </div>
                </div>
              </div>

              {/* Verification ID - Now part of flow, not absolute */}
              <div className="w-full text-center pb-4">
                <p className="text-xs text-[#9ca3af] font-mono tracking-widest">
                  Certificate ID: {student.id}
                </p>
                <p className="text-xs text-[#9ca3af] font-mono tracking-widest mt-1">
                  Verified by SkyRek
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Actions & Congratulations */}
      <div className="w-full lg:w-[400px] bg-white shadow-2xl z-50 p-8 flex flex-col justify-center border-l border-gray-100 relative">
        <div className="mb-10 text-center lg:text-left">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
          <p className="text-gray-600 leading-relaxed">
            You have successfully verified your credential. This certificate is a testament to your hard work and dedication in mastering AI & Machine Learning.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
              <Download className="w-4 h-4 mr-2" /> Download
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center justify-center w-full px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative z-50"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-5 h-5 mr-2" />
                )}
                {isDownloading ? 'Generating PDF...' : 'Download as PDF'}
              </button>
              <button
                onClick={handleDownloadImage}
                disabled={isDownloading}
                className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer relative z-50"
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ImageIcon className="w-5 h-5 mr-2" />
                )}
                {isDownloading ? 'Generating Image...' : 'Download as Image'}
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Certificate;
