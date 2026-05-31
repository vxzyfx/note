import { defineConfig } from "astro/config";
import { unified } from '@astrojs/markdown-remark';
import starlight from "@astrojs/starlight";
import mermaid from 'astro-mermaid';
import echarts from './echarts-integration';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';

function appendUniquePlugins(target, plugins) {
  const seen = new Set(target);

  for (const plugin of plugins) {
    if (seen.has(plugin)) continue;
    target.push(plugin);
    seen.add(plugin);
  }
}

function moveLegacyMarkdownConfig(config, newConfig) {
  const markdownUpdate = newConfig.markdown;
  const processor = config.markdown?.processor;

  if (!markdownUpdate || processor?.name !== 'unified') return newConfig;

  const {
    remarkPlugins,
    rehypePlugins,
    remarkRehype,
    gfm,
    smartypants,
    ...markdownRest
  } = markdownUpdate;

  if (remarkPlugins) appendUniquePlugins(processor.options.remarkPlugins, remarkPlugins);
  if (rehypePlugins) appendUniquePlugins(processor.options.rehypePlugins, rehypePlugins);
  if (remarkRehype) Object.assign(processor.options.remarkRehype, remarkRehype);
  if (gfm !== undefined) processor.options.gfm = gfm;
  if (smartypants !== undefined) processor.options.smartypants = smartypants;

  const sanitizedConfig = { ...newConfig };

  if (Object.keys(markdownRest).length > 0) {
    sanitizedConfig.markdown = markdownRest;
  } else {
    delete sanitizedConfig.markdown;
  }

  return sanitizedConfig;
}

const wrappedMarkdownIntegrations = new WeakSet();

function useMarkdownProcessor(integration) {
  const setup = integration.hooks?.['astro:config:setup'];

  if (!setup || wrappedMarkdownIntegrations.has(integration)) return integration;

  const wrappedIntegration = {
    ...integration,
    hooks: {
      ...integration.hooks,
      'astro:config:setup': async (params) => {
        const wrappedParams = Object.create(Object.getPrototypeOf(params));
        Object.defineProperties(wrappedParams, Object.getOwnPropertyDescriptors(params));
        wrappedParams.updateConfig = (newConfig) => (
          params.updateConfig(moveLegacyMarkdownConfig(params.config, newConfig))
        );

        const result = await setup(wrappedParams);

        wrapMarkdownIntegrations(params.config.integrations);

        return result;
      },
    },
  };

  wrappedMarkdownIntegrations.add(integration);
  wrappedMarkdownIntegrations.add(wrappedIntegration);

  return wrappedIntegration;
}

function wrapMarkdownIntegrations(integrations) {
  for (let index = 0; index < integrations.length; index++) {
    integrations[index] = useMarkdownProcessor(integrations[index]);
  }
}

export default defineConfig({
  site: "https://note.shug.site",
  markdown: {
    processor: unified({
      smartypants: false,
      gfm: false,
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathJax],
    }),
  },
  integrations: [
    useMarkdownProcessor(mermaid({
      theme: 'forest',
      autoTheme: true
    })),
    useMarkdownProcessor(echarts()),
    useMarkdownProcessor(starlight({
      title: "shug的笔记集合",
      lastUpdated: true,
      customCss: ["./global.css"],
      social: [
        { icon: 'github', label: 'GitHub', href: "https://github.com/vxzyfx/note" },
      ],
      sidebar: [
        {
          label: "前端",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "1-frontend",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "数据库",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "2-database",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "C/CPP",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "3-cpp",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "golang",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "4-go",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Flutter",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "5-flutter",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "苹果",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "6-apple",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "笔记",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "7-note",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Linux",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "8-linux",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "协议",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "9-protocol",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Rust",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "10-rust",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Javascript",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "11-javascript",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Kotlin",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "12-kotlin",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Java",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "13-java",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Python",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "14-python",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "其他语言",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "15-other-language",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "汇编",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "16-asm",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "AI",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "17-ai",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "C#",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "18-csharp",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "区块链",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "19-blockchain",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "文件系统",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "20-fs",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "安卓",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "21-android",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Spring",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "22-spring",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "加密",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "23-encryption",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "容器技术",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "24-container",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "kubernetes",
          collapsed: true,
          items: [
            {
              autogenerate: {
                directory: "25-k8s",
                collapsed: true,
              },
            },
          ],
        },
      ],
    })),
  ],
});
