import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, CheckCircle2, Hourglass, Trash2, MapPin, CalendarDays, AlertTriangle, ChevronDown, RefreshCw } from 'lucide-react';

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 ring-amber-200',
  'in-progress': 'bg-sky-100 text-sky-800 ring-sky-200',
  resolved: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
};

function seedIfEmpty() {
  try {
    const current = JSON.parse(localStorage.getItem('issues') || '[]');
    if (current.length) return;
    const samples = [
      { title:'Pothole near 5th Ave', description:'Large pothole causing cars to swerve.', location:'5th Ave & Pine', category:'road', severity:'high', status:'pending' },
      { title:'Broken street light', description:'Street light flickers and turns off.', location:'Maple St 220', category:'lighting', severity:'medium', status:'in-progress' },
      { title:'Overflowing trash can', description:'Trash spilling over sidewalk.', location:'Central Park West', category:'waste', severity:'low', status:'resolved' },
      { title:'Clogged drainage', description:'Water puddles after rain.', location:'Riverside 14', category:'water', severity:'medium', status:'pending' },
      { title:'Debris on road', description:'Branches blocking bike lane.', location:'Elm & 3rd', category:'other', severity:'high', status:'pending' },
    ].map(s=>({
      id: crypto.randomUUID(),
      ...s,
      reporter:'Seed',
      date:new Date(Date.now()-Math.random()*1000*60*60*24*6).toISOString(),
      image:'',
    }));
    localStorage.setItem('issues', JSON.stringify(samples));
  } catch {}
}

export default function IssuesFeed() {
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [realtime, setRealtime] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const pull = () => {
    try { setIssues(JSON.parse(localStorage.getItem('issues') || '[]')); } catch { setIssues([]); }
  };

  useEffect(() => { seedIfEmpty(); pull(); }, []);

  useEffect(() => {
    if (!realtime) return;
    const t = setInterval(() => pull(), 10000);
    return () => clearInterval(t);
  }, [realtime]);

  const filtered = useMemo(() => {
    let data = issues.slice();
    if (status !== 'all') data = data.filter(i => i.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(i => `${i.title} ${i.description} ${i.location}`.toLowerCase().includes(q));
    }
    data.sort((a,b) => sort === 'newest' ? new Date(b.date)-new Date(a.date) : new Date(a.date)-new Date(b.date));
    return data;
  }, [issues, query, status, sort]);

  const markResolved = (id) => {
    const next = issues.map(i => i.id === id ? { ...i, status: 'resolved' } : i);
    setIssues(next);
    localStorage.setItem('issues', JSON.stringify(next));
  };

  const deleteIssue = (id) => {
    const next = issues.filter(i => i.id !== id);
    setIssues(next);
    localStorage.setItem('issues', JSON.stringify(next));
  };

  const cycleStatus = (id) => {
    const order = ['pending','in-progress','resolved'];
    const next = issues.map(i => {
      if (i.id !== id) return i;
      const idx = order.indexOf(i.status);
      return { ...i, status: order[(idx+1)%order.length] };
    });
    setIssues(next);
    localStorage.setItem('issues', JSON.stringify(next));
  };

  const manualRefresh = async () => {
    setRefreshing(true);
    await new Promise(r=>setTimeout(r, 500));
    pull();
    setRefreshing(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Community Issues</h2>
        <div className="flex items-center gap-2">
          <button onClick={manualRefresh} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-200 hover:bg-white transition">
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''}/> Refresh
          </button>
          <div className="inline-flex items-center gap-2 text-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${realtime ? 'bg-emerald-500' : 'bg-gray-300'}`}/>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" checked={realtime} onChange={(e)=>setRealtime(e.target.checked)} />
              Real-time
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18}/>
              <input
                placeholder="Search title, location..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-4 space-y-3">
            <div className="text-sm font-medium text-gray-700 flex items-center gap-2"><Filter size={16}/> Filters</div>
            <div className="text-sm">
              <label className="block text-gray-600 mb-1">Status</label>
              <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="text-sm">
              <label className="block text-gray-600 mb-1">Sort</label>
              <select value={sort} onChange={(e)=>setSort(e.target.value)} className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-4">
              <div className="text-xs text-gray-500">Open Issues</div>
              <div className="text-2xl font-semibold">{issues.filter(i=>i.status!=="resolved").length}</div>
            </div>
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-4">
              <div className="text-xs text-gray-500">Resolved</div>
              <div className="text-2xl font-semibold text-emerald-600">{issues.filter(i=>i.status==="resolved").length}</div>
            </div>
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-4">
              <div className="text-xs text-gray-500">High Priority</div>
              <div className="text-2xl font-semibold text-rose-600">{issues.filter(i=>i.severity==='high' || i.severity==='critical').length}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((i, idx) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="group rounded-xl bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold line-clamp-1">{i.title}</div>
                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                          <MapPin size={14} className="text-indigo-600"/> {i.location}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-md ring-1 ${statusColors[i.status]}`}>{i.status}</span>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 line-clamp-2">{i.description}</div>

                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14}/> {new Date(i.date).toLocaleString()}
                      </div>
                      <div className="capitalize">{i.category} • {i.severity}</div>
                    </div>

                    <AnimatePresence initial={false}>
                      {openIndex === i.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3"
                        >
                          {i.image ? (
                            <img src={i.image} alt="Attachment" className="w-full rounded-md object-cover"/>
                          ) : (
                            <div className="text-xs text-gray-500">No image attached.</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={()=>cycleStatus(i.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <Hourglass size={16}/> Cycle Status
                      </button>
                      {i.status !== 'resolved' ? (
                        <button
                          onClick={()=>markResolved(i.id)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <CheckCircle2 size={16}/> Mark Resolved
                        </button>
                      ) : null}
                      <button
                        onClick={()=>deleteIssue(i.id)}
                        className="ml-auto inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700"
                      >
                        <Trash2 size={16}/> Delete
                      </button>
                      <button
                        onClick={()=>setOpenIndex(openIndex===i.id?null:i.id)}
                        className="inline-flex items-center gap-2 px-2 py-1.5 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
                        aria-label="Toggle details"
                      >
                        <ChevronDown size={16} className={`${openIndex===i.id?'rotate-180':''} transition`} />
                      </button>
                    </div>

                    {['high','critical'].includes(i.severity) && i.status!=='resolved' ? (
                      <div className="mt-3 text-xs text-rose-600 flex items-center gap-2">
                        <AlertTriangle size={14}/> High priority — crews will be notified.
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 text-center text-gray-500">No issues match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
