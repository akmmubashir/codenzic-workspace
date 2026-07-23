import React from 'react';
import { projects } from '../lib/seed';
import { PageHeader, Button } from '../components/ui/Primitives';
import { ProjectCard } from '../components/projects/ProjectCard';

export function Projects() {
  return <div><PageHeader title="Projects" subtitle="All active and archived projects" action={<Button>New project</Button>} /><div className="grid gap-5 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div>;
}
