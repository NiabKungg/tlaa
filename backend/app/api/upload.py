"""
File upload endpoint for CMS admin.
"""
import os
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.core.security import get_current_admin

router = APIRouter()

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    _admin=Depends(get_current_admin),
):
    """Upload a file and return its public URL."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    # Check extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{ext}' not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    # Read content (check size)
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    # Generate unique filename with date prefix
    date_prefix = datetime.now().strftime("%Y%m")
    sub_dir = os.path.join(UPLOAD_DIR, date_prefix)
    os.makedirs(sub_dir, exist_ok=True)

    unique_name = f"{uuid.uuid4().hex[:12]}{ext}"
    file_path = os.path.join(sub_dir, unique_name)

    # Write file
    with open(file_path, "wb") as f:
        f.write(content)

    # Return the public URL path
    url_path = f"/uploads/{date_prefix}/{unique_name}"
    return {"url": url_path, "filename": file.filename, "size": len(content)}
