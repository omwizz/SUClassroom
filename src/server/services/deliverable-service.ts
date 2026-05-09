import {
  DELIVERABLE_ALLOWED_EXTENSIONS,
  DELIVERABLE_ALLOWED_MIME_TYPES,
  DELIVERABLE_EDITABLE_STATUSES,
  DELIVERABLE_MAX_FILE_SIZE_BYTES,
  DELIVERABLE_SUBMITTABLE_STATUSES,
  type DeliverableStatus,
  type ResourceFileType,
} from "@/constants/deliverables";
import type { DeliverableDetail } from "@/types/deliverables";

export class DeliverableService {
  static canEdit(status: DeliverableStatus) {
    return DELIVERABLE_EDITABLE_STATUSES.includes(status);
  }

  static canSubmit(status: DeliverableStatus) {
    return DELIVERABLE_SUBMITTABLE_STATUSES.includes(status);
  }

  static nextSubmittedStatus(status: DeliverableStatus): DeliverableStatus {
    return status === "draft" ? "submitted" : "resubmitted";
  }

  static shouldIncrementVersion(status: DeliverableStatus) {
    return status !== "draft";
  }

  static inferFileType(fileName: string, mimeType: string): ResourceFileType {
    const extension = this.extensionOf(fileName);

    if (extension === ".pdf") {
      return "pdf";
    }

    if (extension === ".doc") {
      return "doc";
    }

    if (extension === ".docx") {
      return "docx";
    }

    if (extension === ".ppt") {
      return "ppt";
    }

    if (extension === ".pptx") {
      return "pptx";
    }

    if (extension === ".xls") {
      return "xls";
    }

    if (extension === ".xlsx") {
      return "xlsx";
    }

    if (mimeType.startsWith("image/")) {
      return "image";
    }

    return "other";
  }

  static validateFile(file: File) {
    if (file.size <= 0) {
      return "El archivo esta vacio.";
    }

    if (file.size > DELIVERABLE_MAX_FILE_SIZE_BYTES) {
      return "El archivo supera el limite de 10 MB.";
    }

    if (
      !DELIVERABLE_ALLOWED_MIME_TYPES.includes(
        file.type as (typeof DELIVERABLE_ALLOWED_MIME_TYPES)[number],
      )
    ) {
      return "Tipo de archivo no permitido. Usa PDF, Word, PowerPoint, Excel o imagen.";
    }

    const fileType = this.inferFileType(file.name, file.type);
    const allowedExtensions = DELIVERABLE_ALLOWED_EXTENSIONS[fileType];

    if (
      allowedExtensions.length > 0 &&
      !allowedExtensions.includes(this.extensionOf(file.name))
    ) {
      return "La extension del archivo no coincide con el tipo permitido.";
    }

    return null;
  }

  static buildVersionSnapshot(deliverable: DeliverableDetail) {
    return {
      title: deliverable.title,
      description: deliverable.description,
      instructionsSnapshot: deliverable.instructionsSnapshot,
      status: deliverable.status,
      version: deliverable.version,
      files: deliverable.files.map((file) => ({
        id: file.id,
        fileName: file.fileName,
        filePath: file.filePath,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
      })),
      links: deliverable.links.map((link) => ({
        id: link.id,
        title: link.title,
        url: link.url,
        description: link.description,
      })),
    };
  }

  static sanitizeFileName(fileName: string) {
    const cleaned = fileName
      .trim()
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    return cleaned || `archivo-${Date.now()}`;
  }

  static buildStoragePath(input: {
    studentId: string;
    projectId: string;
    deliverableId: string;
    fileName: string;
  }) {
    return [
      "deliverables",
      input.studentId,
      input.projectId,
      input.deliverableId,
      `${Date.now()}-${this.sanitizeFileName(input.fileName)}`,
    ].join("/");
  }

  private static extensionOf(fileName: string) {
    const index = fileName.lastIndexOf(".");

    return index >= 0 ? fileName.slice(index).toLowerCase() : "";
  }
}

