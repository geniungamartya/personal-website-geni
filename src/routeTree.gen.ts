/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as PlaygroundImport } from "./routes/playground";
import { Route as PhotoVideoImport } from "./routes/photo-video";
import { Route as BlogImport } from "./routes/blog";
import { Route as IndexImport } from "./routes/index";
import { Route as BlogIndexImport } from "./routes/blog.index";
import { Route as BlogEditorImport } from "./routes/blog.editor";
import { Route as BlogSlugImport } from "./routes/blog.$slug";

// Create/Update Routes

const PlaygroundRoute = PlaygroundImport.update({
  id: "/playground",
  path: "/playground",
  getParentRoute: () => rootRoute,
} as any);

const PhotoVideoRoute = PhotoVideoImport.update({
  id: "/photo-video",
  path: "/photo-video",
  getParentRoute: () => rootRoute,
} as any);

const BlogRoute = BlogImport.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const BlogIndexRoute = BlogIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute,
} as any);

const BlogEditorRoute = BlogEditorImport.update({
  id: "/editor",
  path: "/editor",
  getParentRoute: () => BlogRoute,
} as any);

const BlogSlugRoute = BlogSlugImport.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => BlogRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/blog": {
      id: "/blog";
      path: "/blog";
      fullPath: "/blog";
      preLoaderRoute: typeof BlogImport;
      parentRoute: typeof rootRoute;
    };
    "/photo-video": {
      id: "/photo-video";
      path: "/photo-video";
      fullPath: "/photo-video";
      preLoaderRoute: typeof PhotoVideoImport;
      parentRoute: typeof rootRoute;
    };
    "/playground": {
      id: "/playground";
      path: "/playground";
      fullPath: "/playground";
      preLoaderRoute: typeof PlaygroundImport;
      parentRoute: typeof rootRoute;
    };
    "/blog/$slug": {
      id: "/blog/$slug";
      path: "/$slug";
      fullPath: "/blog/$slug";
      preLoaderRoute: typeof BlogSlugImport;
      parentRoute: typeof BlogImport;
    };
    "/blog/editor": {
      id: "/blog/editor";
      path: "/editor";
      fullPath: "/blog/editor";
      preLoaderRoute: typeof BlogEditorImport;
      parentRoute: typeof BlogImport;
    };
    "/blog/": {
      id: "/blog/";
      path: "/";
      fullPath: "/blog/";
      preLoaderRoute: typeof BlogIndexImport;
      parentRoute: typeof BlogImport;
    };
  }
}

// Create and export the route tree

interface BlogRouteChildren {
  BlogSlugRoute: typeof BlogSlugRoute;
  BlogEditorRoute: typeof BlogEditorRoute;
  BlogIndexRoute: typeof BlogIndexRoute;
}

const BlogRouteChildren: BlogRouteChildren = {
  BlogSlugRoute: BlogSlugRoute,
  BlogEditorRoute: BlogEditorRoute,
  BlogIndexRoute: BlogIndexRoute,
};

const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/blog": typeof BlogRouteWithChildren;
  "/photo-video": typeof PhotoVideoRoute;
  "/playground": typeof PlaygroundRoute;
  "/blog/$slug": typeof BlogSlugRoute;
  "/blog/editor": typeof BlogEditorRoute;
  "/blog/": typeof BlogIndexRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/photo-video": typeof PhotoVideoRoute;
  "/playground": typeof PlaygroundRoute;
  "/blog/$slug": typeof BlogSlugRoute;
  "/blog/editor": typeof BlogEditorRoute;
  "/blog": typeof BlogIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/blog": typeof BlogRouteWithChildren;
  "/photo-video": typeof PhotoVideoRoute;
  "/playground": typeof PlaygroundRoute;
  "/blog/$slug": typeof BlogSlugRoute;
  "/blog/editor": typeof BlogEditorRoute;
  "/blog/": typeof BlogIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/blog"
    | "/photo-video"
    | "/playground"
    | "/blog/$slug"
    | "/blog/editor"
    | "/blog/";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/photo-video"
    | "/playground"
    | "/blog/$slug"
    | "/blog/editor"
    | "/blog";
  id:
    | "__root__"
    | "/"
    | "/blog"
    | "/photo-video"
    | "/playground"
    | "/blog/$slug"
    | "/blog/editor"
    | "/blog/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  BlogRoute: typeof BlogRouteWithChildren;
  PhotoVideoRoute: typeof PhotoVideoRoute;
  PlaygroundRoute: typeof PlaygroundRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BlogRoute: BlogRouteWithChildren,
  PhotoVideoRoute: PhotoVideoRoute,
  PlaygroundRoute: PlaygroundRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/blog",
        "/photo-video",
        "/playground"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/blog": {
      "filePath": "blog.tsx",
      "children": [
        "/blog/$slug",
        "/blog/editor",
        "/blog/"
      ]
    },
    "/photo-video": {
      "filePath": "photo-video.tsx"
    },
    "/playground": {
      "filePath": "playground.tsx"
    },
    "/blog/$slug": {
      "filePath": "blog.$slug.tsx",
      "parent": "/blog"
    },
    "/blog/editor": {
      "filePath": "blog.editor.tsx",
      "parent": "/blog"
    },
    "/blog/": {
      "filePath": "blog.index.tsx",
      "parent": "/blog"
    }
  }
}
ROUTE_MANIFEST_END */
