"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { Project } from "@/types/database";
import { DatabaseService } from "@/lib/supabase/service";
import { useAuth } from "@/context/AuthContext";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  project: Project | null;
  onClose: () => void;
  onProjectDeleted: (projectId: string) => void;
}

export function DeleteConfirmModal({
  isOpen,
  project,
  onClose,
  onProjectDeleted,
}: DeleteConfirmModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!project) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await DatabaseService.deleteProject(
        project.id,
        user?.id || project.user_id
      );
      if (success) {
        onProjectDeleted(project.id);
        onClose();
      } else {
        throw new Error("Unable to delete project record");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Project Confirmation"
      description="This action cannot be undone"
    >
      <div className="space-y-4 pt-2">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
            {error}
          </div>
        )}

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>
            Are you sure you want to delete <strong>"{project.title}"</strong>?
            All associated tasks and workspace records will also be removed.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            isLoading={loading}
            onClick={handleDelete}
            id="modal-confirm-delete-btn"
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    </Modal>
  );
}
