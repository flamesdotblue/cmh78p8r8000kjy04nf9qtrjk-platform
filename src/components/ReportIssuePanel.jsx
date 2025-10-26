import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, AlertTriangle, MapPin, Loader2, X } from 'lucide-react';

const defaultCategories = [
  { value: 'road', label: 'Road / Pothole' },
  { value: 'waste', label: 'Waste / Garbage' },
  { value: 'lighting', label: 'Street Lighting' },
  { value: 'water', label: 'Water / Drainage' },
  { value: 'other', label: 'Other' },
];

const severities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

export default function ReportIssuePanel() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('road');
  const [severity, setSeverity] = useState('medium');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [opened, setOpened] = useState(true);

  const inputRef = useRef(null);

  const valid = useMemo(() => {
    return title.trim().length >= 5 && description.trim().length >= 10 && location.trim().length >= 3;
  }, [title, description, location]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getIssues = () => {
    try { return JSON.parse(localStorage.getItem('issues') || '[]'); } catch { return []; }
  };

  const setIssues = (issues) => {
    localStorage.setItem('issues', JSON.stringify(issues));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) { showToast('error', 'Please fill all fields properly.'); return; }
    setSubmitting(true);

    // Simulate API + AI categorization
    await new Promise((r) => setTimeout(r, 900));

    const newIssue = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      category,
      severity,
      status: 'pending',
      reporter: 'Guest',
      date: new Date().toISOString(),
      image: imagePreview || '',
    };

    const existing = getIssues();
    setIssues([newIssue, ...existing]);

    setSubmitting(false);
    showToast('success', 'Issue reported successfully! Our AI is analyzing it.');

    setTitle('');
    setDescription('');
    setLocation('');
    setCategory('road');
    setSeverity('medium');
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Report an Issue</h2>
        <button onClick={()=>setOpened(o=>!o)} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          {opened ? 'Hide' : 'Show'} form
        </button>
      </div>

      <AnimatePresence initial={false}>
        {opened && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="e.g., Large pothole on 3rd Street"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={location}
                      onChange={(e)=>setLocation(e.target.value)}
                      placeholder="Enter address or landmark"
                      className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pr-9"
                    />
                    <MapPin className="absolute right-2 top-3.5 text-gray-400" size={18}/>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Tip: Enable GPS on mobile for precise coordinates.</p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  placeholder="Describe the issue clearly so it can be resolved faster."
                  className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-xs text-gray-500">AI hint: More context improves categorization accuracy.</p>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {defaultCategories.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <div className="mt-1 grid grid-cols-4 gap-2">
                    {severities.map(s => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={()=>setSeverity(s.value)}
                        className={`text-sm px-3 py-2 rounded-md border transition ${severity===s.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >{s.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div
                onDragOver={(e)=>e.preventDefault()}
                onDrop={handleDrop}
                className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-6"
              >
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div
                  className={`mt-2 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 ${imagePreview ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300 bg-gray-50'}`}
                  onClick={()=>inputRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full rounded-md object-cover" />
                  ) : (
                    <>
                      <UploadCloud className="text-gray-400" size={28} />
                      <p className="text-sm text-gray-600 text-center">Drag & drop to upload, or click to select</p>
                    </>
                  )}
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
                <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                  <ImageIcon size={14} /> Supported: JPG, PNG
                </div>

                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition ${valid ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  {submitting ? (<><Loader2 className="animate-spin" size={16}/> Submitting...</>) : 'Submit Issue'}
                </button>

                <div className="mt-4 text-xs text-gray-500 flex items-start gap-2">
                  <AlertTriangle size={14} className="text-amber-500"/> Our AI will categorize this automatically upon submission.
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 z-[60] px-4 py-3 rounded-md shadow-lg ring-1 ${toast.type==='success' ? 'bg-emerald-600 text-white ring-emerald-500/60' : 'bg-rose-600 text-white ring-rose-500/60'}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
