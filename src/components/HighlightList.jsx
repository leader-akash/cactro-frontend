// import React, { useState, useEffect } from 'react';
// import HighlightItem from './HighlightItem';

// const HighlightList = () => {
//   const [highlights, setHighlights] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchHighlights = () => {
//       chrome.runtime.sendMessage(
//         { type: 'GET_HIGHLIGHTS' },
//         (response) => {
//           setHighlights(response || []);
//           setIsLoading(false);
//         }
//       );
//     };

//     fetchHighlights();

//     // Listen for storage changes to update the list
//     const handleStorageChange = (changes, area) => {
//       if (area === 'local' && changes.highlights) {
//         setHighlights(changes.highlights.newValue || []);
//       }
//     };

//     chrome.storage.onChanged.addListener(handleStorageChange);

//     return () => {
//       chrome.storage.onChanged.removeListener(handleStorageChange);
//     };
//   }, []);

//   const handleDeleteHighlight = (id) => {
//     chrome.runtime.sendMessage(
//       { type: 'DELETE_HIGHLIGHT', id },
//       (response) => {
//         setHighlights(response || []);
//       }
//     );
//   };

//   if (isLoading) {
//     return <div>Loading highlights...</div>;
//   }

//   if (highlights.length === 0) {
//     return <div>No highlights saved yet. Select text on any page to save highlights.</div>;
//   }

//   return (
//     <div className="highlight-list">
//       {highlights.map((highlight) => (
//         <HighlightItem
//           key={highlight.id}
//           highlight={highlight}
//           onDelete={handleDeleteHighlight}
//         />
//       ))}
//     </div>
//   );
// };

// export default HighlightList;

// import React, { useState, useEffect } from 'react';

// const HighlightList = () => {
//   const [highlights, setHighlights] = useState([]);

//   useEffect(() => {
//     chrome.runtime.sendMessage(
//       { type: 'GET_HIGHLIGHTS' },
//       (response) => {
//         setHighlights(response || []);
//       }
//     );
//   }, []);

//   const handleDelete = (id) => {
//     chrome.runtime.sendMessage(
//       { type: 'DELETE_HIGHLIGHT', id },
//       (response) => {
//         setHighlights(response || []);
//       }
//     );
//   };

//   return (
//     <div>
//       {highlights.map(highlight => (
//         <div className='highlight-list' key={highlight.id}>
//           <p>{highlight.text}</p>
//           <button onClick={() => handleDelete(highlight.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HighlightList;




// new

import React, { useState, useEffect } from 'react';
import HighlightItem from './HighlightItem';

const HighlightList = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = () => {
      chrome.runtime.sendMessage(
        { type: 'GET_HIGHLIGHTS' },
        (response) => {
          setHighlights(response || []);
        }
      );
    };

    fetchHighlights();

    // Listen for storage changes
    const handleStorageChange = (changes, area) => {
      if (area === 'local' && changes.highlights) {
        setHighlights(changes.highlights.newValue || []);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const handleDeleteHighlight = (id) => {
    chrome.runtime.sendMessage(
      { type: 'DELETE_HIGHLIGHT', id },
      (response) => {
        setHighlights(response || []);
      }
    );
  };

  return (
    <div className="highlight-list">
      {highlights.map(highlight => (
        <HighlightItem
          key={highlight.id}
          highlight={highlight}
          onDelete={() => handleDeleteHighlight(highlight.id)}
        />
      ))}
    </div>
  );
};

export default HighlightList;