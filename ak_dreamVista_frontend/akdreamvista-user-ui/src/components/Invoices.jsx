import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileInvoiceDollar, FaArrowLeft, FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Invoices.css";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/properties/paid", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (inv) => {
    const elementId = `pdf-template-${inv.propertyId}`;
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error("PDF Template not found:", elementId);
      return;
    }

    // Temporarily show the element for capturing
    element.style.display = "block"; 
    
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        logging: false 
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${inv.propertyCode}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      element.style.display = "none"; 
    }
  };

 const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',         // Changed from 'currency' to 'decimal'
    minimumFractionDigits: 2, // Always shows .00
    maximumFractionDigits: 2  // Limits to two decimal places
  }).format(amount || 0);
};

  // Pagination Logic
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);

  return (
    <div className="invoices-page">
      <div className="invoice-container-wrapper">
        <div className="invoice-page-header">
          <div className="title-section">
            <h1 className="main-page-title">
              My <span className="highlight-text">Invoices</span>
            </h1>
          </div>
          <button className="back-btn-right" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
        </div>

        {loading ? (
          <div className="loader-container"><div className="spinner"></div></div>
        ) : (
          <div className="premium-table-card">
            {invoices.length > 0 ? (
              <>
                <table className="premium-invoice-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Property Code</th>
                      <th>Property Title</th>
                      <th>Date Paid</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInvoices.map((inv, index) => (
                      <tr key={inv.razorpayPaymentId || index}>
                        <td>{indexOfFirstInvoice + index + 1}</td>
                        <td><span className="p-code-badge">{inv.propertyCode}</span></td>
                        <td className="prop-title-cell">{inv.propertiesTitle}</td>
                        <td>{inv.paymentDate}</td> 
                        
                        <td className="amount-text">{formatCurrency(inv.fee)}</td>
                        <td><span className="status-pill">PAID</span></td>
                        <td className="text-center">
                          <button className="action-download-icon" onClick={() => downloadPDF(inv)} title="Download PDF">
                            <FaFilePdf />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination-bar">
                  <span className="page-info">Showing {indexOfFirstInvoice + 1} to {Math.min(indexOfLastInvoice, invoices.length)} of {invoices.length}</span>
                  <div className="page-buttons">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><FaChevronLeft /></button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><FaChevronRight /></button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-data-state">
                <FaFileInvoiceDollar className="empty-icon" />
                <h3>No Invoices Found</h3>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HIDDEN PDF TEMPLATES (Rendered off-screen for html2canvas) */}
      <div style={{ position: "absolute", left: "-9999px", top: "0" }}>
        {invoices.map((inv) => (
          <div key={inv.propertyId} id={`pdf-template-${inv.propertyId}`} className="pdf-generate-container" style={{ width: '800px', padding: '40px', background: '#fff' }}>
            <div
  className="pdf-header"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ff7800",
    paddingBottom: "20px",
  }}
>
             <div className="pdf-brand">
    <h1 style={{ margin: 0, color: "#ff7800", fontWeight: "800" }}>
      AK DREAMVISTA
    </h1>
    <p style={{ margin: "4px 0 0", color: "#666", fontSize: "13px" }}>
      Premium Real Estate Solutions
    </p>
  </div>
              <div
  className="pdf-label"
  style={{
    background: "#ff7800",
    color: "#fff",
    padding: "10px 28px",
    fontWeight: "800",
    borderRadius: "6px",
    fontSize: "14px",
    letterSpacing: "1px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "220px",
  }}
>
  PAYMENT RECEIPT
</div>

            </div>

            <div className="pdf-body" style={{ marginTop: '30px' }}>
              <div
  className="pdf-info-row"
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "30px",
  }}
>
                {/* <div>
                  <strong>Billed To:</strong>
                  <p style={{ margin: '5px 0 0 0' }}>Valued Customer</p>
                  <p style={{ margin: 0 }}>Ph: {inv.ownerContact || "Registered Member"}</p>
                </div> */}
               <div style={{ textAlign: "right", fontSize: "13px", lineHeight: "1.6" }}>
    <div>
      <strong>Invoice :</strong> #INV-{inv.propertyCode}
    </div>
    <div>
      <strong>Date :</strong> {inv.paymentDate}
    </div>
    <div>
      <strong>PaymentId :</strong> {inv.razorpayPaymentId}
    </div>
  </div>
</div>
            

              {/* Enhanced Property Details Section */}
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #eee' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#fb6a19', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Property Specifications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                  <div><strong>Title : </strong> {inv.propertiesTitle}</div>
                  <div><strong>Type : </strong> {inv.propertiesType || 'N/A'}</div>
                  <div><strong>Land Area : </strong> {inv.landArea || 'N/A'}</div>
                  <div><strong>Facing : </strong> {inv.facing || 'N/A'}</div>
                  <div><strong>Floors : </strong> {inv.floors || 'N/A'}</div>
                  <div><strong>Property Code : </strong> {inv.propertyCode}</div>
                </div>
              </div>

              <table className="pdf-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ background: '#eee' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Description</th>
                    <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Consulting Fee for {inv.propertiesTitle} ({inv.propertyCode})</td>
                   <td style={{ textAlign: 'right', padding: '12px', borderBottom: '1px solid #eee' }}>
  {formatCurrency(inv.fee)}
</td>
                  </tr>
                </tbody>
              </table>

              <div className="pdf-total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#fb6a19', borderTop: '2px solid #fb6a19', paddingTop: '10px' }}>
                <span>Grand Total (Paid)</span>
                <span>{formatCurrency(inv.fee)}</span>
              </div>
            </div>

            <div className="pdf-footer" style={{ marginTop: '50px', textAlign: 'center', color: '#888', fontSize: '12px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <p>This is a computer-generated receipt and does not require a physical signature.</p>
              <p>Thank you for choosing AK DreamVista!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;