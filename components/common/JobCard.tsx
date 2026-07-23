import Link from 'next/link';
import { Job } from '@/lib/types';
import { MapPin, Briefcase, DollarSign, BookmarkPlus } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
  featured?: boolean;
}

export function JobCard({ job, onSave, isSaved = false, featured = false }: JobCardProps) {
  return (
    <div className={`rounded-lg border transition-all hover:shadow-lg ${
      featured ? 'border-primary/50 bg-card' : 'border-border bg-card'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {featured && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                  Featured
                </span>
              )}
            </div>
            <Link href={`/jobs/${job.id}`}>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                {job.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
          </div>
          {onSave && (
            <button
              onClick={() => onSave(job.id)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <BookmarkPlus size={20} />
            </button>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase size={16} />
            <span>{job.type}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>
                ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Category & Experience */}
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
            {job.category}
          </span>
          <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            {job.experience}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {Math.floor((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))} days ago
          </span>
          <Link
            href={`/jobs/${job.id}`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
