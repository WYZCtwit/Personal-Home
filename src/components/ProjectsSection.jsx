import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, Edit2, Trash2, Plus } from 'lucide-react';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: 1,
    title: 'MVP: Insight Analyzer',
    titleCn: '洞察分析仪',
    summary: '0-1 AI 原生产品探索，剥离伪命题的极速业务雷达。',
    details: '基于 Vibe-coding 工作流打造的智能业务分析平台 MVP。仅用三天时间完成业务逻辑的模型化映射，通过 prompt 动态调配底层数据感知链。精准识别并过滤管理层的需求噪音，实现了需求文档向可运行代码的零损耗降维着陆，使核心开发周期提升 300%。',
    tags: ['AI Agent', 'Vibe-coding', 'MVP'],
    link: '#'
  },
  {
    id: 2,
    title: 'DeepWater Logic Engine',
    titleCn: '深水逻辑系统',
    summary: '拆解高杂度业务系统的可视化工具。',
    details: '不再依赖冗长的 PRD，本项目提供了一个基于节点映射的动态思维网络模型。允许产品经理与业务线直接通过极少的自然语言描述生成技术架构初步方案。它如同血管一样接通各业务模块，释放产研团队 40% 的精力回归业务思考本身，回归代码美学。',
    tags: ['No-Code', 'System Design'],
    link: '#'
  },
  {
    id: 3,
    title: 'Prompt-Driven CMS',
    titleCn: 'Prompt驱动内容引擎',
    summary: '以 Prompt 彻底替代传统表单与后台的实验性项目。',
    details: '传统后台系统填表繁文缛节？此项目打破常规，构建了"一句话创建业务流"的 AI 原生级 CMS。通过解析自然语言上下文直接落表和生成 API 分发流，是"让复杂业务在按键瞬间即刻着陆"理念的最佳实践场所。',
    tags: ['LLM', 'Product Architecture'],
    link: '#'
  }
];

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState(defaultProjects);
  const [expandedId, setExpandedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formDetails, setFormDetails] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formLink, setFormLink] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('customProjects');
    if (saved) {
      try { setProjectsList(JSON.parse(saved)); } catch (e) { /* ignore */ }
    }
  }, []);

  const saveProjects = (newList) => {
    setProjectsList(newList);
    localStorage.setItem('customProjects', JSON.stringify(newList));
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormTitle(project.title);
      setFormSummary(project.summary || '');
      setFormDetails(project.details || '');
      setFormTags(project.tags ? project.tags.join(', ') : '');
      setFormLink(project.link || '');
    } else {
      setEditingProject(null);
      setFormTitle('');
      setFormSummary('');
      setFormDetails('');
      setFormTags('');
      setFormLink('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formTitle) return;

    const newProject = {
      id: editingProject ? editingProject.id : Date.now(),
      title: formTitle,
      titleCn: '',
      summary: formSummary,
      details: formDetails,
      tags: formTags.split(',').map(tag => tag.trim()).filter(Boolean),
      link: formLink
    };

    if (editingProject) {
      saveProjects(projectsList.map(p => p.id === editingProject.id ? { ...p, ...newProject } : p));
    } else {
      saveProjects([...projectsList, newProject]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这个项目吗？')) {
      saveProjects(projectsList.filter(p => p.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">03 — 个人项目</div>
        </motion.div>

        <div className="projects-list">
          <AnimatePresence>
            {projectsList.map((project, idx) => {
              const isExpanded = expandedId === project.id;
              return (
                <motion.div
                  key={project.id}
                  className={`project-card card ${isExpanded ? 'project-card--active' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => toggleExpand(project.id)}
                >
                  {/* Project number */}
                  <span className="project-index">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="project-header">
                    <div className="project-info">
                      <h3 className="project-title">{project.title}</h3>
                      {project.titleCn && (
                        <span className="project-title-cn">{project.titleCn}</span>
                      )}
                      <p className="project-summary">{project.summary}</p>
                      <div className="project-tags">
                        {project.tags && project.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="expand-btn"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="project-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="details-content">
                          <div className="details-divider" />
                          <p className="details-text">{project.details}</p>
                          <div className="details-footer">
                            <a
                              href={project.link && project.link !== '#' ? project.link : '#'}
                              target={project.link && project.link !== '#' ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="details-link"
                              onClick={(e) => {
                                if (!project.link || project.link === '#') e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              浏览项目 <ArrowUpRight size={14} />
                            </a>

                            <div className="project-admin">
                              <button className="admin-btn admin-btn--edit" onClick={(e) => { e.stopPropagation(); handleOpenModal(project); }}>
                                <Edit2 size={14} />
                              </button>
                              <button className="admin-btn admin-btn--delete" onClick={(e) => handleDelete(e, project.id)}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <motion.button
            className="add-project-btn"
            whileHover={{ y: -2, borderColor: 'var(--accent)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenModal()}
          >
            <Plus size={18} strokeWidth={1.5} />
            <span>添加新项目</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="modal-content card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="modal-title">{editingProject ? '编辑项目' : '添加新项目'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>项目名称*</label>
                  <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required placeholder="例如：我的酷炫产品 MVP" />
                </div>
                <div className="form-group">
                  <label>一句话简介</label>
                  <input type="text" value={formSummary} onChange={(e) => setFormSummary(e.target.value)} placeholder="一段简短的亮点介绍" />
                </div>
                <div className="form-group">
                  <label>详细描述</label>
                  <textarea value={formDetails} onChange={(e) => setFormDetails(e.target.value)} rows="3" placeholder="讲述项目的背景、挑战和你的解决方案..." />
                </div>
                <div className="form-group">
                  <label>标签 (用逗号分隔)</label>
                  <input type="text" value={formTags} onChange={(e) => setFormTags(e.target.value)} placeholder="例如：React, AI Agent, MVP" />
                </div>
                <div className="form-group">
                  <label>项目链接</label>
                  <input type="text" value={formLink} onChange={(e) => setFormLink(e.target.value)} placeholder="例如：https://github.com/..." />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>取消</button>
                  <button type="submit" className="btn-submit" disabled={!formTitle}>保存</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
