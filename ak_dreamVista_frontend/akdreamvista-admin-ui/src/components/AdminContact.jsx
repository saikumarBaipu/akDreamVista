import React, { useState, useEffect } from "react";
import { FaTrash, FaEnvelope, FaUser, FaCalendarAlt, FaSearch, FaReply, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./AdminContact.css";

export default function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/contact/all", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data.reverse());
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Delete this message?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/contact/delete/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
          setMessages(messages.filter((msg) => msg.id !== id));
        }
      } catch (error) {
        alert("Error deleting message");
      }
    }
  };

  // PAGINATION LOGIC
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredMessages.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredMessages.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="ak-admin-messages-page">
      <div className="ak-admin-container">
        <div className="ak-admin-header">
          <div className="header-text">
  <h1>Customer <span>Messages</span></h1>
  <p>Showing {indexOfFirstCard + 1}-{Math.min(indexOfLastCard, filteredMessages.length)} of {filteredMessages.length}</p>
</div>
          <div className="ak-search-box">
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
            />
          </div>
        </div>

        {loading ? (
          <div className="ak-loading">Loading...</div>
        ) : (
          <>
            <div className="ak-messages-grid">
              {currentCards.map((msg) => (
                <div key={msg.id} className="ak-message-card">
                  <div className="ak-card-top">
                    {/* <span className="ak-date"><FaCalendarAlt /> {new Date(msg.submittedAt).toLocaleDateString()}</span> */}
                   {/* Inside currentCards.map((msg) => (...)) */}

<span className="ak-date">
  <FaCalendarAlt /> {
    new Date(msg.submittedAt).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    }).replace(',', '') 
  }
</span>
                    <button className="ak-del-btn" onClick={() => handleDelete(msg.id)}><FaTrash /></button>
                  </div>
                  <div className="ak-card-body">
                    <h4 className="ak-subject">{msg.subject}</h4>
                    <p className="ak-message-content">{msg.message}</p>
                  </div>
                  <div className="ak-card-footer">
                    <div className="ak-user-info">
                      <p><FaUser /> {msg.name}</p>
                      <p><FaEnvelope /> {msg.email}</p>
                    </div>
                    <a 
  href={`mailto:${msg.email}?subject=Re: ${msg.subject} - AK DreamVista`} 
  className="ak-reply-link"
>
  <FaReply /> Reply
</a>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="ak-pagination">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagi-btn"
                >
                  <FaChevronLeft />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button 
                    key={index + 1} 
                    onClick={() => paginate(index + 1)}
                    className={`pagi-number ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagi-btn"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}