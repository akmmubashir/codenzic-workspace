import React, { useState } from 'react';
import { FilePenLine } from 'lucide-react';
import type { AttendanceRecord } from '../../lib/types';
import { useApp } from '../../lib/store';
import { Badge, Button, Card } from '../ui/Primitives';
import { AttendanceUpdateRequestDialog } from './AttendanceUpdateRequestDialog';

export function AttendanceHistory({ records }: { records: AttendanceRecord[] }) {
  const { attendanceUpdateRequests, submitAttendanceUpdateRequest } = useApp();
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  return (
    <Card className="mt-6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Check in</th>
              <th className="px-4 py-3 font-medium">Check out</th>
              <th className="px-4 py-3 font-medium">Hours</th>
              <th className="px-4 py-3 font-medium">Mode</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-content">
                  {new Date(record.date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-muted">{record.checkIn ?? '-'}</td>
                <td className="px-4 py-3 text-muted">{record.checkOut ?? '-'}</td>
                <td className="px-4 py-3 tabular-nums text-content">
                  {record.workedHours ? `${record.workedHours}h` : '-'}
                </td>
                <td className="px-4 py-3 text-muted">{record.mode}</td>
                <td className="px-4 py-3">
                  <Badge label={record.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {attendanceUpdateRequests.find((request) => request.attendanceRecordId === record.id) ? (
                    <Badge
                      label={
                        attendanceUpdateRequests.find((request) => request.attendanceRecordId === record.id)?.status ??
                        'Pending'
                      }
                    />
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setSelectedRecord(record)}>
                      <FilePenLine size={14} />
                      Update
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRecord && (
        <AttendanceUpdateRequestDialog
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onSubmit={(values) => {
            submitAttendanceUpdateRequest({ attendanceRecordId: selectedRecord.id, ...values });
            setSelectedRecord(null);
          }}
        />
      )}
    </Card>
  );
}
