# Xuewei Wu — Academic Homepage

英文优先的个人学术主页。使用原生 HTML / CSS / JavaScript，无需安装依赖、无需构建，可直接部署到 GitHub Pages；也可双击 `index.html` 离线浏览。页面基础内容与导航在禁用 JavaScript 时仍然可用。

## 设计与参考分析

- [Academic Pages](https://academicpages.github.io/)：采用其顶部导航、桌面左侧个人信息栏、右侧正文的信息架构；小屏幕将侧栏移至正文上方。
- [Junhao Liang](https://liangjunhao-thu.github.io/)：参考白底、蓝色链接、精简学术介绍、浅蓝 News 区域及文字优先的排版。
- 本项目为原创静态实现，**并非 Academic Pages / Minimal Mistakes 的 Jekyll fork**。没有复制参考网站的代码、照片、论文或个人经历，也不需要 Ruby/Jekyll。若以后需要博客、独立论文页面或完整 CV，可将内容迁移到 Academic Pages。
- 克制的蓝绿色强调色、系统字体、细分隔线，避免远程字体、追踪脚本和外部资源依赖。支持深浅色主题、移动菜单、滚动导航高亮、键盘焦点、跳转正文、减少动态效果偏好和打印布局。

## 内容来源与待补充信息

1. 姓名、学位、当前职位、机构：由本人在对话中提供。当前职位未添加未经提供的起始年份。
2. About：依据本人提供的英文简介；研究方向依据本人提供的医学 AI、计算病理、医学影像、多模态基础模型、临床决策智能体和肿瘤学主题。
3. LinkedIn：仅使用本人指定的 [个人资料](https://www.linkedin.com/in/xuewei-wu-a80865369/)，其公开索引列出 ESMO Merit Travel Grant（2025 年 9 月）与 CSC Scholarship（2025 年 5 月）。完整资料在浏览器中需要登录，因此未补入教育背景、其他任职或更详细履历。索引核查日期：2026-10-26。
4. GitHub：本人提供的 [xwumed](https://github.com/xwumed)。未混入其他同名人员资料。
5. 照片仅使用标明含义的 XW 字母占位；无虚构人物图像。邮箱、CV、Google Scholar、ORCID、论文和项目均明确标为待补充。个人转发的论文未被当作本人论文。

## 文件说明

```text
index.html          个人信息与全部六个板块的内容
assets/style.css    响应式排版、主题和打印样式
assets/main.js      菜单、主题切换与导航高亮
assets/favicon.svg  XW 字母图标
.nojekyll           告诉 GitHub Pages 直接发布静态文件
README.md           使用与部署说明
```

## GitHub Pages 部署

目标仓库：`xwumed/xwumed.github.io`。预期网址：`https://xwumed.github.io/`。

1. 将本文件夹中的文件放到仓库 `main` 分支根目录。必须让 `index.html` 位于根目录，不要多套一层 `xwumed.github.io` 文件夹。保留 `.nojekyll`。
2. 在仓库打开 **Settings → Pages**。
3. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
4. 选择 **main** 和 **/ (root)**，点击 **Save**。
5. 等待 Pages 构建完成，打开 `https://xwumed.github.io/`。首次发布可能需要数分钟。
6. 以后直接编辑 `index.html` 并提交到 `main`，Pages 将自动更新。

官方步骤：[GitHub Pages Quickstart](https://docs.github.com/en/pages/quickstart)。本站没有构建流程，不需要配置 `_config.yml`。不要把 GitHub 的登录信息、访问令牌或其他秘密放进仓库。

若使用其他仓库名，例如 `academic-homepage`，网址变为 `https://xwumed.github.io/academic-homepage/`；当前资源使用相对路径，兼容这种项目路径。

## 本地预览

最简单：双击 `index.html`。需要 HTTP 预览时，在本文件夹执行：

```bash
python3 -m http.server 8765
```

然后打开 `http://localhost:8765/`。按 `Ctrl+C` 停止。无需 npm。

## 如何更新内容

### 简介、单位与链接

在 `index.html` 中搜索对应英文文字并修改。单位同时出现在侧栏、About 和 Contact，请保持一致。更新标题或研究重点时，同时检查 `<title>` 和 description / Open Graph 元数据。

### 头像

将本人提供的正式照片保存为 `assets/profile.jpg`，然后把 `portrait-placeholder` 的整个 `<div>` 替换为：

```html
<img class="portrait-placeholder" src="assets/profile.jpg"
     alt="Portrait of Xuewei Wu" width="154" height="154"
     style="object-fit:cover">
```

删除 `photo-caption` 占位说明。照片不会自动从 LinkedIn 或 GitHub 抓取。

### 邮箱、简历与学术主页

在 `profile-links` 中加入经确认的链接，例如真实邮箱的 `mailto:` 链接、实际存在的 PDF 相对路径及本人 Google Scholar / ORCID 地址，再删除相应待补充说明。同步更新 Contact 的邮箱提示。没有资料时不要创建空链接或示例地址。

### 论文

将 Publications 内的 `.empty-state` 替换为真实论文条目，并移除该板块标题旁的 `To be added`。每篇至少核对标题、完整作者列表、期刊 / 会议、年份和 DOI。示例结构（以下为待填写字段，不是论文记录）：

```html
<article class="research-row">
  <div><h3>VERIFIED TITLE</h3>
  <p>VERIFIED AUTHOR LIST</p>
  <p><em>VERIFIED VENUE</em>, YEAR</p>
  <!-- Add DOI / paper / code links only after verification. -->
  </div>
</article>
```

### 项目与动态

项目只加入已确认的项目名、简介和真实仓库 / 数据集链接，并移除对应占位说明。News 使用倒序排列；新条目使用 `<time datetime="YYYY-MM">Mon YYYY</time>`。当前荣誉日期来自公开资料，不应改写为加入实验室或毕业日期。

## 发布前检查

- 在桌面和手机上检查文字、头像、菜单、锚点和深浅色模式。
- 论文和项目尚未补齐时，保留清晰的待补充状态。
- 确认个人身份和机构表述准确，并检查所有新增链接。
- 所有主内容直接存在 HTML 中，不依赖 JavaScript 才能被访问或索引。
