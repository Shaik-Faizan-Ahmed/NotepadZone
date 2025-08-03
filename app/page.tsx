"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Eye, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Firebase-related imports
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";


interface Note {
  id: string
  text: string
  timestamp: Date
}

export default function NotePadZone() {
  const [isDark, setIsDark] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [inputText, setInputText] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
    const fetchedNotes: Note[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      timestamp: doc.data().timestamp?.toDate() || new Date(),
    }));
    setNotes(fetchedNotes.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  });

  return () => unsubscribe();
}, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("notepadzone-theme", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const addNote = async () => {
  if (inputText.trim()) {
    try {
      await addDoc(collection(db, "notes"), {
        text: inputText.trim(),
        timestamp: serverTimestamp(),
      });
      setInputText(""); // clear input
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  }
};


  const viewNote = (note: Note) => {
    setSelectedNote(note)
    setShowModal(true)
  }

  const copyNote = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const deleteNote = async (id: string) => {
  const password = prompt("Enter password to delete:")
  if (password === "gurunanda") {
    await deleteDoc(doc(db, "notes", id))
    if (selectedNote?.id === id) {
      setShowModal(false)
      setSelectedNote(null)
    }
  }
}


  const closeModal = () => {
    setShowModal(false)
    setSelectedNote(null)
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#121212] text-white" : "bg-[#f9f9f9] text-[#222222]"
      }`}
    >
      {/* Navigation Bar */}
      <nav
        className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 ${
          isDark ? "bg-[#1f1f1f]/80" : "bg-[#f8f8f8]/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={scrollToTop} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-semibold">NotePadZone</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <p className={`text-lg mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Welcome back!</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            NotePadZone
          </h1>
          <p className={`text-xl md:text-2xl italic ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Where your notes and links stay safe.
          </p>
        </div>
      </section>

      {/* Notebook Style Input Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
        {/* Classic Yellow Notebook Background */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundColor: "#fef7cd",
            backgroundImage: `
              linear-gradient(to right, #dc2626 78px, transparent 78px),
              repeating-linear-gradient(
                transparent,
                transparent 24px,
                #374151 24px,
                #374151 25px
              )
            `,
            backgroundSize: "100% 25px",
          }}
        />

        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto relative z-10">
          <div className="bg-transparent p-8 ml-20">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Drop your thoughts here..."
              className="w-full h-64 bg-transparent border-2 border-blue-400/30 rounded-lg outline-none resize-none font-mono text-lg leading-6 text-gray-800 placeholder-gray-600 shadow-lg focus:border-blue-500/50 focus:shadow-blue-500/25 focus:shadow-2xl transition-all duration-300"
              style={{
                fontFamily: "Courier New, monospace",
                lineHeight: "25px",
                paddingTop: "2px",
                padding: "12px",
              }}
            />
            <div className="flex justify-center mt-8">
              <Button
                onClick={addNote}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                  isDark ? "bg-[#4CAF50] hover:bg-[#66bb6a] text-white" : "bg-[#2e7d32] hover:bg-[#388e3c] text-white"
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Entries Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Notes</h2>

          {notes.length === 0 ? (
            <div className="text-center py-16">
              <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                No notes yet. Add your first note above!
              </p>
            </div>
          ) : (
            <div
              className="relative p-8 rounded-lg min-h-screen"
              style={{
                backgroundImage: `url('/wood-board-background.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note, index) => {
                  // Array of sticky note colors with good text contrast
                  const stickyColors = [
                    { bg: "linear-gradient(135deg, #fef08a 0%, #fde047 100%)", text: "text-gray-800" }, // Yellow
                    { bg: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)", text: "text-gray-800" }, // Orange
                    { bg: "linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)", text: "text-gray-800" }, // Pink/Red
                    { bg: "linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)", text: "text-gray-800" }, // Blue
                    { bg: "linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)", text: "text-gray-800" }, // Green
                    { bg: "linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)", text: "text-gray-800" }, // Purple
                    { bg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", text: "text-gray-800" }, // Light Yellow
                    { bg: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)", text: "text-gray-800" }, // Light Purple
                  ]

                  const colorIndex = index % stickyColors.length
                  const stickyColor = stickyColors[colorIndex]

                  return (
                    <div
                      key={note.id}
                      className={`relative p-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 transform rotate-1 hover:rotate-0 ${stickyColor.text}`}
                      style={{
                        background: stickyColor.bg,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1)",
                        transform: `rotate(${Math.random() * 6 - 3}deg)`,
                      }}
                    >
                      {/* Sticky note tape effect */}
                      <div
                        className="absolute -top-2 left-4 w-12 h-6 bg-white/60 rounded-sm shadow-sm"
                        style={{
                          background: "linear-gradient(45deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
                          transform: "rotate(-10deg)",
                        }}
                      />

                      <div className="mb-4">
                        <p className={`text-sm font-medium ${stickyColor.text}`}>{formatTimestamp(note.timestamp)}</p>
                      </div>

                      <div className="mb-4">
                        <p className={`font-mono text-sm leading-relaxed ${stickyColor.text}`}>
                          {truncateText(note.text)}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => viewNote(note)}
                          size="sm"
                          className="bg-[#2196F3] hover:bg-[#42a5f5] text-white rounded-full px-3 py-1 text-xs shadow-md"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          onClick={() => copyNote(note.text)}
                          size="sm"
                          className="bg-[#FF9800] hover:bg-[#ffb74d] text-white rounded-full px-3 py-1 text-xs shadow-md"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          onClick={() => deleteNote(note.id)}
                          size="sm"
                          className="bg-[#F44336] hover:bg-[#ef5350] text-white rounded-full px-3 py-1 text-xs shadow-md"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div
            className={`relative w-full max-w-4xl max-h-[80vh] rounded-lg shadow-2xl overflow-hidden ${
              isDark ? "bg-[#1f1f1f]" : "bg-white"
            }`}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Note Details</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => copyNote(selectedNote.text)}
                    size="sm"
                    className="bg-[#2196F3] hover:bg-[#42a5f5] text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={() => deleteNote(selectedNote.id)}
                    size="sm"
                    className="bg-[#F44336] hover:bg-[#ef5350] text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                  <Button onClick={closeModal} size="sm" variant="outline">
                    Close
                  </Button>
                </div>
              </div>
              <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {formatTimestamp(selectedNote.timestamp)}
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              <pre
                className={`whitespace-pre-wrap font-mono text-sm leading-relaxed select-all ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {selectedNote.text}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
