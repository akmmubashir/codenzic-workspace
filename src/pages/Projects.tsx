import React, { useState } from 'react';
import { PageHeader, Button } from '../components/ui/Primitives';
import { ProjectCard } from '../components/projects/ProjectCard';
import { useApp } from '../lib/store';
import type { Project } from '../lib/types';
import { ProjectFormDialog } from '../components/projects/ProjectFormDialog';
import { ProjectDetailsDialog } from '../components/projects/ProjectDetailsDialog';

export function Projects() {
  const [editing, setEditing] = useState<Project | 'new' | null>(null);
  const [viewing, setViewing] = useState<Project | null>(null);
  const { projects, employees, tasks, addProject, updateProject, deleteProject } = useApp();
  const withProgress = (project: Project) => {
    const projectTasks = tasks.filter((task) => task.projectId === project.id);
    return {
      ...project,
      progress: projectTasks.length
        ? Math.round(projectTasks.reduce((total, task) => total + task.progress, 0) / projectTasks.length)
        : 0,
    };
  };
  if (editing) {
    return (
      <div>
        <PageHeader
          title={editing === 'new' ? 'New project' : 'Edit project'}
          subtitle="Configure the project, delivery dates and team"
          action={
            <Button variant="outline" onClick={() => setEditing(null)}>
              Back to projects
            </Button>
          }
        />
        <ProjectFormDialog
          embedded
          project={editing === 'new' ? undefined : editing}
          employees={employees}
          onClose={() => setEditing(null)}
          onSave={(values) => {
            if (editing === 'new') addProject(values);
            else updateProject(editing.id, values);
            setEditing(null);
          }}
        />
      </div>
    );
  }
  if (viewing) {
    return (
      <div>
        <PageHeader
          title={viewing.name}
          subtitle="Project workspace and delivery activity"
          action={
            <Button variant="outline" onClick={() => setViewing(null)}>
              Back to projects
            </Button>
          }
        />
        <ProjectDetailsDialog
          embedded
          project={viewing}
          tasks={tasks.filter((task) => task.projectId === viewing.id)}
          employees={employees}
          onClose={() => setViewing(null)}
        />
      </div>
    );
  }
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="All active and archived projects"
        action={<Button onClick={() => setEditing('new')}>New project</Button>}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((sourceProject) => {
          const project = withProgress(sourceProject);
          return (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => setViewing(project)}
              onEdit={() => setEditing(project)}
              onDelete={() => {
                if (window.confirm(`Delete ${project.name}?`)) deleteProject(project.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
