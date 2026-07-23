import Link from 'next/link';
import { Training } from '@/lib/types';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

interface TrainingCardProps {
  training: Training;
}

export function TrainingCard({ training }: TrainingCardProps) {
  return (
    <Link
      href={`/training/${training.id}`}
      className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/50 h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded font-semibold">
              {training.level}
            </span>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
              {training.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
            {training.title}
          </h3>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
          <BookOpen className="text-primary" size={24} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">By {training.instructor}</p>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{training.description}</p>

      <div className="flex flex-wrap gap-3 mb-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users size={14} />
          {training.students} students
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={14} />
          {training.duration}h
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          {training.rating}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">${training.price}</p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
          Enroll
        </button>
      </div>
    </Link>
  );
}
