import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { empById } from '../../lib/seed';
import { useApp } from '../../lib/store';
import { Badge, Button, Card } from '../ui/Primitives';

export function LateReasonReviewList() {
  const { lateCheckInRecords, reviewLateCheckIn } = useApp();
  const [comments, setComments] = useState<Record<string, string>>({});
  if (!lateCheckInRecords.length) return null;
  return (
    <Card className="mt-6 overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold text-content">Late check-in reviews</h2>
        <p className="mt-1 text-sm text-muted">Review employee explanations before taking any attendance action.</p>
      </div>
      <div className="divide-y divide-border">
        {lateCheckInRecords.map((record) => {
          const employee = empById(record.employeeId);
          return (
            <div key={record.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-content">
                    {employee?.name ?? record.employeeId}{' '}
                    <span className="font-normal text-muted">· {record.lateDurationMins} min late</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {record.reasonCategory} · {record.actualCheckInTime} (scheduled {record.scheduledCheckInTime})
                  </p>
                  <p className="mt-2 text-sm text-content">{record.explanation}</p>
                  {record.attachmentName && (
                    <p className="mt-1 text-xs text-muted">Attachment: {record.attachmentName}</p>
                  )}
                </div>
                <Badge label={record.reviewStatus} />
              </div>
              {record.reviewStatus === 'Pending Review' ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <input
                    value={comments[record.id] ?? ''}
                    onChange={(event) => setComments({ ...comments, [record.id]: event.target.value })}
                    placeholder="Reviewer comment (optional)"
                    className="h-9 min-w-52 flex-1 rounded-lg border border-border bg-bg px-3 text-sm text-content"
                  />
                  <Button size="sm" onClick={() => reviewLateCheckIn(record.id, 'Accepted', comments[record.id] ?? '')}>
                    <Check size={15} />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => reviewLateCheckIn(record.id, 'Rejected', comments[record.id] ?? '')}
                  >
                    <X size={15} />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reviewLateCheckIn(record.id, 'Excused', comments[record.id] ?? '')}
                  >
                    Excuse
                  </Button>
                </div>
              ) : (
                record.reviewerComment && (
                  <p className="mt-3 text-sm text-muted">Review comment: {record.reviewerComment}</p>
                )
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
