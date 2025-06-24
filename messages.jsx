import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { Card } from "../components/Card";

const dummyConversations = [
  {
    id: 1,
    user: "شركة التقنية",
    lastMessage: "هل يمكنك بدء العمل الأسبوع القادم؟",
    lastDate: "2025-06-23T14:00:00",
    unread: true,
    messages: [
      { id: 1, fromMe: false, content: "هل يمكنك بدء العمل الأسبوع القادم؟", date: "2025-06-23T14:00:00" },
      { id: 2, fromMe: true, content: "نعم، متاح للبدء يوم الاثنين.", date: "2025-06-23T14:05:00" },
    ],
  },
  {
    id: 2,
    user: "سامي",
    lastMessage: "هل ما زلت متاحًا؟",
    lastDate: "2025-06-22T10:30:00",
    unread: false,
    messages: [
      { id: 3, fromMe: false, content: "هل ما زلت متاحًا؟", date: "2025-06-22T10:30:00" },
      { id: 4, fromMe: true, content: "نعم، ما هي التفاصيل؟", date: "2025-06-22T10:32:00" },
    ],
  },
];

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
}

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setConversations(dummyConversations);
    if (dummyConversations.length > 0) setActiveConvId(dummyConversations[0].id);
  }, []);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  // تمرير للمسج الأخير عند تغيير المحادثة أو إرسال رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv, newMessage]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConvId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                { id: Date.now(), fromMe: true, content: newMessage.trim(), date: new Date().toISOString() },
              ],
              lastMessage: newMessage.trim(),
              lastDate: new Date().toISOString(),
              unread: false,
            }
          : conv
      )
    );
    setNewMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-emerald-600 mb-8 select-none">💬 المحادثات</h1>
      <div className="flex flex-1 gap-6">
        {/* قائمة المحادثات */}
        <aside className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-h-[80vh]">
          {conversations.length === 0 ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">لا توجد محادثات.</p>
          ) : (
            conversations.map(({ id, user, lastMessage, lastDate, unread }) => (
              <button
                key={id}
                onClick={() => setActiveConvId(id)}
                className={`w-full text-right p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col items-start justify-center cursor-pointer
                  ${activeConvId === id ? "bg-emerald-50 dark:bg-emerald-900" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
              >
                <div className="flex justify-between w-full items-center">
                  <h2 className="font-semibold text-lg truncate max-w-[70%]">{user}</h2>
                  {unread && <span className="inline-block bg-emerald-600 text-white text-xs rounded-full px-2 py-0.5">جديد</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-300 truncate max-w-[90%]">{lastMessage}</p>
                <time className="text-xs text-gray-400 dark:text-gray-500 mt-1">{new Date(lastDate).toLocaleDateString("ar-EG")}</time>
              </button>
            ))
          )}
        </aside>

        {/* نافذة المحادثة */}
        <section className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[80vh]">
          {!activeConv ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">اختر محادثة للبدء</p>
          ) : (
            <>
              <header className="border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-emerald-600">{activeConv.user}</h2>
                <Button onClick={() => setActiveConvId(null)} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white">
                  إنهاء المحادثة
                </Button>
              </header>

              <div
                className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-200 dark:scrollbar-track-gray-700"
                aria-live="polite"
                aria-relevant="additions"
              >
                {activeConv.messages.map(({ id, fromMe, content, date }) => (
                  <div
                    key={id}
                    className={`flex ${fromMe ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md text-white ${
                        fromMe ? "bg-emerald-600 rounded-bl-none" : "bg-gray-400 dark:bg-gray-600 rounded-br-none"
                      }`}
                    >
                      <p>{content}</p>
                      <time className="text-xs text-gray-200 block mt-1 text-right">{formatTime(date)}</time>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-4 items-center"
              >
                <input
                  type="text"
                  placeholder="اكتب رسالة..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  aria-label="اكتب رسالة"
                  autoComplete="off"
                />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">
                  إرسال
                </Button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}