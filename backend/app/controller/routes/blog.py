from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from app.controller.deps import get_blog_service, get_current_user
from app.model.blog_post import BlogPost, BlogPostData
from app.model.user import User
from app.service.blog_service import BlogService

router = APIRouter(prefix="/blog", tags=["blog"])


@router.post("/", response_model=BlogPost)
def create_blog_post(
    blog_data: BlogPostData,
    service: BlogService = Depends(get_blog_service),
    current_user: User = Depends(get_current_user),
):
    """Create a new blog post."""
    blog = service.create_blog_post(blog_data)
    return blog


@router.get("/", response_model=List[BlogPost])
def get_all_blog_posts(service: BlogService = Depends(get_blog_service)):
    """Retrieve all blog posts."""
    return service.get_all_blog_posts()


@router.get("/{blog_id}", response_model=BlogPost)
def get_blog_post_by_id(blog_id: str, service: BlogService = Depends(get_blog_service)):
    """Retrieve a blog post by ID."""
    blog = service.get_blog_post_by_id(blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog


@router.get("/{slug}", response_model=BlogPost)
def get_blog_post_by_slug(slug: str, service: BlogService = Depends(get_blog_service)):
    """Retrieve a blog post by ID."""
    blog = service.get_blog_post_by_id(slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return blog


@router.put("/{blog_id}", response_model=BlogPost)
def update_blog_post(
    blog_id: UUID,
    blog_data: BlogPostData,
    service: BlogService = Depends(get_blog_service),
    current_user: User = Depends(get_current_user),
):
    """Update an existing blog post."""
    blog = service.update_blog_post(blog_id, blog_data)
    return blog


@router.delete("/{blog_id}")
def delete_blog_post(
    blog_id: str,
    service: BlogService = Depends(get_blog_service),
    current_user: User = Depends(get_current_user),
):
    """Delete a blog post by ID."""
    service.delete_blog_post(blog_id)
    return {"message": "Blog post deleted successfully"}
