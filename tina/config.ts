import { defineConfig, type Template } from "tinacms";

const coverFields: Template["fields"] = [
  {
    name: "image",
    label: "Image",
    type: "image",
  },
  {
    name: "alt",
    label: "Alt Text",
    type: "string",
  },
];

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || "",
    },
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "content",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Lab (Daily) ──
      {
        name: "daily",
        label: "Lab (Daily)",
        path: "content/daily",
        format: "md",
        match: {
          include: "*/index",
          exclude: "_index",
        },
        defaultItem: () => ({
          fmContentType: "daily_post",
          date: new Date().toISOString(),
          tags: ["dailyimmersive"],
        }),
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const num = values?.number || "000";
              const padded = String(num).padStart(3, "0");
              return `daily-immersive---${padded}/index`;
            },
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "number",
            label: "Episode Number",
            type: "number",
            required: true,
            description: "에피소드 번호 (예: 61)",
          },
          {
            name: "summary",
            label: "Summary",
            type: "string",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
          },
          {
            name: "cover",
            label: "Cover",
            type: "object",
            fields: coverFields,
          },
          {
            name: "fmContentType",
            label: "Content Type",
            type: "string",
            ui: {
              component: "hidden",
            },
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },

      // ── Sprint ──
      {
        name: "sprint",
        label: "Sprint",
        path: "content/sprint",
        format: "md",
        match: {
          include: "*/index",
          exclude: "_index",
        },
        defaultItem: () => ({
          fmContentType: "sprint_post",
          date: new Date().toISOString(),
        }),
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const num = values?.number || "000";
              const padded = String(num).padStart(3, "0");
              return `sprint-${padded}/index`;
            },
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "number",
            label: "Sprint Number",
            type: "number",
            required: true,
            description: "스프린트 번호 (예: 4)",
          },
          {
            name: "summary",
            label: "Summary",
            type: "string",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
          },
          {
            name: "cover",
            label: "Cover",
            type: "object",
            fields: coverFields,
          },
          {
            name: "fmContentType",
            label: "Content Type",
            type: "string",
            ui: {
              component: "hidden",
            },
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },

      // ── Blog ──
      {
        name: "blog",
        label: "Blog",
        path: "content/blog",
        format: "md",
        match: {
          include: "*/index",
        },
        defaultItem: () => ({
          fmContentType: "blog_post",
          date: new Date().toISOString(),
        }),
        ui: {
          filename: {
            slugify: (values) => {
              const slug = (values?.title || "untitled")
                .toLowerCase()
                .replace(/[^a-z0-9가-힣]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return `${slug}/index`;
            },
          },
        },
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "summary",
            label: "Summary",
            type: "string",
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            required: true,
          },
          {
            name: "cover",
            label: "Cover",
            type: "object",
            fields: coverFields,
          },
          {
            name: "fmContentType",
            label: "Content Type",
            type: "string",
            ui: {
              component: "hidden",
            },
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },
    ],
  },
});
