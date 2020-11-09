import defaultSettings from "@/settings";

const title = defaultSettings.title || "wangfeng-vue2-cli4";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`;
  }
  return `${title}`;
}
