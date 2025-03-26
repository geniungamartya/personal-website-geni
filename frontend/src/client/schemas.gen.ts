// This file is auto-generated by @hey-api/openapi-ts

export const BlogPostSchema = {
  properties: {
    title: {
      type: "string",
      title: "Title",
    },
    slug: {
      type: "string",
      title: "Slug",
    },
    content: {
      type: "string",
      title: "Content",
    },
    id: {
      type: "string",
      format: "uuid",
      title: "Id",
    },
  },
  type: "object",
  required: ["title", "slug", "content", "id"],
  title: "BlogPost",
} as const;

export const BlogPostDataSchema = {
  properties: {
    title: {
      type: "string",
      title: "Title",
    },
    slug: {
      type: "string",
      title: "Slug",
    },
    content: {
      type: "string",
      title: "Content",
    },
  },
  type: "object",
  required: ["title", "slug", "content"],
  title: "BlogPostData",
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: "#/components/schemas/ValidationError",
      },
      type: "array",
      title: "Detail",
    },
  },
  type: "object",
  title: "HTTPValidationError",
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "integer",
          },
        ],
      },
      type: "array",
      title: "Location",
    },
    msg: {
      type: "string",
      title: "Message",
    },
    type: {
      type: "string",
      title: "Error Type",
    },
  },
  type: "object",
  required: ["loc", "msg", "type"],
  title: "ValidationError",
} as const;
