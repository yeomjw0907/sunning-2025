import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section className="bg-[#111827] py-32 px-6 text-white relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-suning-blue/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Our Key<br/>
            <span className="text-suning-blue">Milestones</span>
          </h2>
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed">
            슈닝이 걸어온 혁신의 발자취.<br/>
            더 나은 서비스를 위한 우리의 노력입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => {
            const colSpan = index === 0 ? 'md:col-span-12' : 'md:col-span-6';
            const height = index === 0 ? 'h-[60vh] md:h-[70vh]' : 'h-[50vh]';

            return (
              <div key={project.id} className={`${colSpan} group relative rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 hover:border-suning-blue/30 transition-all duration-500 shadow-2xl`}>
                <div className={`relative w-full ${height}`}>
                  {/* Image with Scale Effect */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <div className="flex items-center gap-3 mb-5">
                          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-suning-blue/20 text-suning-blue border border-suning-blue/30 rounded-full backdrop-blur-md">
                            {project.category}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight word-keep-all group-hover:text-suning-light transition-colors">
                          {project.title}
                        </h3>
                        
                        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-700 ease-in-out">
                          <p className="text-gray-300 text-lg mb-8 word-keep-all leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.description}
                          </p>
                        </div>

                        {project.stat && (
                        <div className="inline-flex items-center gap-3 border-t border-white/10 pt-5 mt-2 w-full">
                            <div className="bg-suning-orange/90 text-white p-2 rounded-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">{project.stat}</span>
                        </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;