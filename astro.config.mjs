import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://note.shug.site',
  integrations: [
    starlight({
      title: 'shug的笔记集合',
      lastUpdated: true,
      social: {
        github: 'https://github.com/vxzyfx/note',
      },
      sidebar: [
        {
          label: '前端',
          collapsed: true,
          autogenerate: { directory: '1-frontend' },
        },
        {
          label: '数据库',
          collapsed: true,
          autogenerate: { directory: '2-database' },
        },
        {
          label: 'C/CPP',
          collapsed: true,
          autogenerate: { directory: '3-cpp' },
        },
        {
          label: 'golang',
          collapsed: true,
          autogenerate: { directory: '4-go' },
        },
        {
          label: 'Flutter',
          collapsed: true,
          autogenerate: { directory: '5-flutter' },
        },
        {
          label: '苹果',
          collapsed: true,
          autogenerate: { directory: '6-apple' },
        },
        {
          label: '笔记',
          collapsed: true,
          autogenerate: { directory: '7-note' },
        },
        {
          label: 'Linux',
          collapsed: true,
          autogenerate: { directory: '8-linux' },
        },
        {
          label: '协议',
          collapsed: true,
          autogenerate: { directory: '9-protocol' },
        },
        {
          label: 'Rust',
          collapsed: true,
          autogenerate: { directory: '10-rust' },
        },
        {
          label: 'Javascript',
          collapsed: true,
          autogenerate: { directory: '11-javascript' },
        },
        {
          label: 'Kotlin',
          collapsed: true,
          autogenerate: { directory: '12-kotlin' },
        },
        {
          label: 'Java',
          collapsed: true,
          autogenerate: { directory: '13-java' },
        },
        {
          label: 'Python',
          collapsed: true,
          autogenerate: { directory: '14-python' },
        },
        {
          label: '工具语言',
          collapsed: true,
          autogenerate: { directory: '15-utils-language' },
        },
        {
          label: '汇编',
          collapsed: true,
          autogenerate: { directory: '16-asm' },
        },
        {
          label: 'PHP',
          collapsed: true,
          autogenerate: { directory: '17-php' },
        },
        {
          label: 'C#',
          collapsed: true,
          autogenerate: { directory: '18-csharp' },
        },
        {
          label: 'Ruby',
          collapsed: true,
          autogenerate: { directory: '19-ruby' },
        },
        {
          label: '文件系统',
          collapsed: true,
          autogenerate: { directory: '20-fs' },
        },
        {
          label: '安卓',
          collapsed: true,
          autogenerate: { directory: '21-android' },
        },
        {
          label: 'Spring',
          collapsed: true,
          autogenerate: { directory: '22-spring' },
        },
        {
          label: '加密',
          collapsed: true,
          autogenerate: { directory: '23-encryption' },
        },
      ],
    }),
  ],
});
