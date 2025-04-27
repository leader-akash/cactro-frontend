import React, { useState } from 'react';
import { summarizeText } from '../services/openai';

const HighlightItem = ({ highlight, onDelete }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleSummarize = async () => {
    if (!highlight.text.trim()) return;
    
    setIsSummarizing(true);
    setSummary(null); // Clear previous summary
    
    try {
      const result = await summarizeText(highlight.text);
      setSummary(result);
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="highlight-item">
      <div className="highlight-meta">
        <a href={highlight.url} target="_blank" rel="noopener noreferrer">
          {highlight.title || 'Untitled Page'}
        </a>
        <span className="highlight-date">
          {new Date(highlight.timestamp).toLocaleString()}
        </span>
      </div>
      <blockquote className="highlight-text">{highlight.text}</blockquote>
      <div className="highlight-actions">
        <button 
          onClick={onDelete} 
          className="delete-button"
          aria-label="Delete highlight"
        >
          Delete
        </button>
        <button 
          onClick={handleSummarize} 
          className="summarize-button"
          disabled={isSummarizing || !highlight.text.trim()}
          aria-label="Summarize text"
        >
          {isSummarizing ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Summarizing...
            </>
          ) : 'Summarize'}
        </button>
      </div>
      {summary && (
        <div className="highlight-summary" aria-live="polite">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
};

export default HighlightItem;


// import React, { useState } from 'react';
// import { summarizeText } from '../services/openai';

// const HighlightItem = ({ highlight, onDelete }) => {
//   const [isSummarizing, setIsSummarizing] = useState(false);
//   const [summary, setSummary] = useState(null);

//   const handleSummarize = async () => {
//     setIsSummarizing(true);
//     try {
//       const result = await summarizeText(highlight.text);
//       setSummary(result);
//     } catch (error) {
//       console.error('Summarization error:', error);
//       setSummary('Failed to generate summary');
//     } finally {
//       setIsSummarizing(false);
//     }
//   };

//   return (
//     <div className="highlight-item">
//       {/* ... existing highlight display code ... */}
//       <div className="highlight-actions">
//         <button onClick={onDelete} className="delete-button">
//           Delete
//         </button>
//         <button 
//           onClick={handleSummarize} 
//           className="summarize-button"
//           disabled={isSummarizing}
//         >
//           {isSummarizing ? 'Summarizing...' : 'Summarize'}
//         </button>
//       </div>
//       {summary && (
//         <div className="highlight-summary">
//           <strong>Summary:</strong> {summary}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighlightItem;

// import React, { useState } from 'react';
// import { summarizeText } from '../services/openai';

// const HighlightItem = ({ highlight, onDelete }) => {
//   const [isSummarizing, setIsSummarizing] = useState(false);
//   const [summary, setSummary] = useState(null);

//   const handleSummarize = async () => {
//     setIsSummarizing(true);
//     try {
//       const result = await summarizeText(highlight.text);
//       setSummary(result);
//     } catch (error) {
//       console.error('Summarization error:', error);
//       setSummary('Failed to generate summary');
//     } finally {
//       setIsSummarizing(false);
//     }
//   };

//   const handleDelete = () => {
//     onDelete(highlight.id);
//   };

//   return (
//     <div className="highlight-item">
//       <div className="highlight-meta">
//         <a href={highlight.url} target="_blank" rel="noopener noreferrer">
//           {highlight.title || highlight.url}
//         </a>
//         <span className="highlight-date">
//           {new Date(highlight.timestamp).toLocaleString()}
//         </span>
//       </div>
//       <blockquote className="highlight-text">{highlight.text}</blockquote>
//       <div className="highlight-actions">
//         <button onClick={handleDelete} className="delete-button">
//           Delete
//         </button>
//         <button 
//           onClick={handleSummarize} 
//           className="summarize-button"
//           disabled={isSummarizing}
//         >
//           {isSummarizing ? 'Summarizing...' : 'Summarize'}
//         </button>
//       </div>
//       {summary && (
//         <div className="highlight-summary">
//           <strong>Summary:</strong> {summary}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HighlightItem;