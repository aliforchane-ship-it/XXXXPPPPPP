
import React from 'react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Library': return 'border-l-purple-500 text-purple-600 bg-purple-50/30';
      case 'Info': return 'border-l-emerald-500 text-emerald-600 bg-emerald-50/30';
      case 'Math': return 'border-l-blue-500 text-blue-600 bg-blue-50/30';
      case 'Drive': return 'border-l-amber-500 text-amber-600 bg-amber-50/30';
      case 'Concours': return 'border-l-rose-500 text-rose-600 bg-rose-50/30';
      default: return 'border-l-slate-400 text-slate-600 bg-slate-50/30';
    }
  };

  return (
    <div className={`group relative bg-white border border-slate-200 border-l-4 ${getCategoryColor(resource.category)} p-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
          {resource.category}
        </span>
        {resource.isImportant && (
          <span className="flex items-center text-rose-600 text-[10px] font-black uppercase tracking-tighter animate-pulse">
            <span className="mr-1">●</span> Crucial
          </span>
        )}
      </div>
      
      <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
        {resource.title}
      </h3>
      
      <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
        {resource.description || `Archives et documents de référence pour la filière TSI.`}
      </p>
      
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-all group/btn"
      >
        <span>Consulter</span>
        <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
    </div>
  );
};

export default ResourceCard;
