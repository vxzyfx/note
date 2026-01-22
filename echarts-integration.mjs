import { visit } from "unist-util-visit";
import { init } from "echarts";

function escapeHtml(text) {
  const htmlEntities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

function remarkEchartslugin(options = {}) {
  return function transformer(tree, file) {

    let echartsCount = 0;

    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "echarts") {
        echartsCount++;
        const option = Function(`return (${node.value})`)();
        let chart = init(null, null, {
          renderer: 'svg', // 必须使用 SVG 模式
          ssr: true, // 开启 SSR
          width: option.width || 600, // 需要指明高和宽
          height: option.height || 400
        });
        chart.setOption(option)
        const svgStr = chart.renderToSVGString();

        const htmlNode = {
          type: "html",
          value: `<div class="echarts">${svgStr}</div>`,
        };

        if (parent && typeof index === "number") {
          parent.children[index] = htmlNode;
        }

        if (options.logger) {
          options.logger.info(
            `Remark transformed echarts block #${echartsCount} in ${file.path || "unknown file"}`,
          );
        }
      }
    });

    if (echartsCount > 0 && options.logger) {
      options.logger.info(
        `Remark total echarts blocks transformed: ${echartsCount}`,
      );
    }
  };
}

export default function astroEcharts(options = {}) {
  return {
    name: "astro-echarts",
    hooks: {
      "astro:config:setup": async ({
        config,
        updateConfig,
        addWatchFile,
        injectScript,
        logger,
        command,
      }) => {
        logger.info("Setting up Echarts integration");
        updateConfig({
          markdown: {
            remarkPlugins: [
              ...(config.markdown?.remarkPlugins || []),
              [remarkEchartslugin, { logger }],
            ],
          },
          vite: {
            optimizeDeps: {
              include: [
                "echarts"
              ],
            },
          },
        });
        // const echartsScriptContent = `
        // const hasEchartsDiagrams = () => {
        //   return document.querySelectorAll('div.echarts').length > 0;
        // };
        // if (hasEchartsDiagrams()) {
        //   console.log('[astro-echarts] Echarts diagrams detected, loading echarts.js...');
        //   import('echarts').then(async (echarts) => {
        //     [...document.querySelectorAll('div.echarts')].map(dom => {
        //       const config = Function("return (" + dom.textContent + ")")();
        //       const initWidth = Math.floor(dom.parentElement.clientWidth)
        //       const height = Math.floor(initWidth * 0.6);
        //       const initHeight = height > ${miniHeight} ? height : ${miniHeight};
        //       dom.style.height = initHeight + "px";
        //       dom.style.width = initWidth + "px";
        //       const chart = echarts.init(dom)
        //       chart.setOption(config)
        //       window.addEventListener('resize', () => { 
        //         const initWidth = Math.floor(dom.parentElement.clientWidth)
        //         const height = Math.floor(initWidth * 0.6);
        //         const initHeight = height > ${miniHeight} ? height : ${miniHeight};
        //         dom.style.height = initHeight + "px";
        //         dom.style.width = initWidth + "px";
        //         chart.resize({ width: initWidth, height: initHeight });
        //       });
        //     })
        //   })
        // }
        // `;
        // injectScript("page", echartsScriptContent);
      },
    },
  };
}

