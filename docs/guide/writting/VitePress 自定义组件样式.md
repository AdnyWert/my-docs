VitePress系列教程：内容展示优化#5 

## 首页组件

如果我们觉得首页内容比较单调，想自已设计点可交互的内容，我们可以通过以下方案追加样式内容

我们在首页`index.md`中添加内容

::: details

<<< ./parts/default-home-layout.md

:::

添加的内容是能直接染到首页的Features下，Footer上的空白部分的，由于vitePress使用的是markdown it解析的md，所以也能直接写html标签

::: details 将新增./guide/writting/parts/footer-show.md

<<< ./parts/footer-show.md

::: 

然后再 index.md中进行引用

```md
<!--@include: ./guide/writting/parts/footer-show.md -->
```

::: tip
还可以使用tailwindcss之类预设样式类，需要安装拓展插件才可以
:::

## Vue SFC组件

我们可以自己写一个SFC，注册到工程中，然后在md中使用

::: details SFC VUE 介绍

<<< ./reference/Vue SFC 介绍.md

:::

1、在theme目录中创建components目录，然后创建Counter.vue

::: details

<<< @/.vitepress/theme/components/Counter.vue

:::

2、在.vitepress/theme/index.ts'中注册Counter.vue组件

::: details

<<< @/.vitepress/theme/index.ts

:::

3、在首页index.md或当前页使用组件

```md
<Counter/>
```

<Counter/>

可以看到`Counter`组件成功被染出来，并且点击按钮能响应式变化数字

所以，对于复杂的交互组件，我们可以通过自定义SFC，然后在`theme/index.js`中注册组件，并在md中使用组件，达到想要的复杂交互效果

::: details Vue style scoped

<<< ./reference/Vue 中 style 的 scoped 属性.md

:::

### 使用首页预留插槽

现在我们已经能做到在Features下Footer上添加自定义内容了，但是我有办法将自定义内容加到Header下 Hero 上吗

答案是可以的，vitepress首页给我们预留了很多插槽，通过插槽我们可以将自定义组件染到想要的位置

### 使用插槽案例

<ClockFlip/>

尝试将一个组件放到Hero上方

1、在components目录下新建目录`clock-filp`，在该目录下新建`FlipNum.vue`和`ClockFlip.vue`

::: details FlipNum.vue

<<< @/.vitepress/theme/components/clock-flip/FlipNum.vue

:::

::: details ClockFlip.vue

<<< @/.vitepress/theme/components/clock-flip/ClockFlip.vue

:::

2、安装vue，因为需要使用vue提供的h方法

```bash
 npm add vue -D
```

3、在`theme/index.ts`中使用插槽

::: details index.ts

<<< @/.vitepress/theme/index.ts#snippet{11, 19}

:::

组件已经染到Header下Hero下方了

### 查看插槽位置

vitepress文档并没有详细说明，我们可以通过查阅vitepress
源码来知道预留的插槽位置，文件在`node_modules/vitepress/dist/client/theme-default/Layout.vue`

::: details Layout.vue

<<< @/.vitepress/theme/components/source/Layout.vue

:::

通过插槽名能大概猜到位置在哪，当然也能一个个试知道具体位置，结合这些插槽就能白定义出更个性化的 vitepress首页了

### 更改首页标题色调

默认首质展示的标题颜色是绿色，图标背景是自色，通过以下操作，可以获得跟方官网一样的炫彩配色了 

步骤1：

在 `.vitepress` 目录下创建 `theme` 目录，`theme` 目录下创建 `index.ts`，输入以下内容
```typescript
import Theme from 'vitepress/theme'

export default {
  ...Theme
}
```

步骤2：

在 `theme` 目录下创建 `style` 目录，`style` 目录下创建 `var.css`
```css
:root {
  --vp-home-hero-name-color: red;
}
```

步骤3：

在 `theme/index.ts` 下引入 `style/var.css`
```typescript
import Theme from 'vitepress/theme'
import './style/var.css'

export default {
  ...Theme
}
```

---
底部说明文字：
可以看到标题颜色已经变成设定的红色了
可以加点渐变色来让整体效果好看点，渐变色可以从这个网站获取

### CSS代码片段
```css
:root {
  /* 标题 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%);

  /* 图标背景 */
  --vp-home-hero-image-background-image: linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%);
  --vp-home-hero-image-filter: blur(150px);
}
```
右下角标签：`CSS`

正文文字

## 首页颜色源码解读

我们通过使用 var.css 文件，给根节点 root 添加了css变量，来改变首页的标题和图片的背景色，那我们要怎么确认用什么属性就能修改我希望修改的元素呢

### 方法一：开发者工具
通过控制台我们就能直观的看出希望修改的样式有没有使用 css 变量，以图片背景做例子

在开发者工具中，可以看到

#### CSS代码块
```css
.image-bg {
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
}
```

**段落说明**

这两个变量就是我们通过 root 下注入的 css 变量，因为我们显式的修改了两个变量，所以系统优先使用我们设定的样式

### 方案二：看源码
拉取 vitepress 的源码，看到 `node_modules/vitepress/dist/client/theme-default/Layout.vue`，这个 sfc 就是文档的布局组件，三种 layout 模式都是使用的这个组件

...略（见[插槽位置](#查看插槽位置)）

看到 `VPContent` 组件，这里会通过 `frontmatter.layout` 来切换使用的布局模式，所以通过这个文件我们可以看到，三种模式对应的组件名为
- doc: VPDoc
- page: VPPage
- home: VPHome

主要看 `VPHome` 组件

拓展，vitepress 使用的读取 md 头部信息所使用的插件是 `gray-matter`，感兴趣的可以查阅下使用方法

...没找着（😥）

这里就是首页模式下的布局情况，可以看到组件名就是对应的我们在 `index.md` 中设置的 `hero` 和 `features`

关于首页标题和图标的样式在 `VPHomeHero` 组件中

> 做个预告，可以看到下面有个 `Content` 组件，可以自定义首页下半部分的内容，将会是下篇文章讲的内容，敬请期待~

然后在VPHero中的源码中可以看到首页布局的真面目了！我们先看到标题的CSS属性

```css
.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
```

可以明显看到这里使用的css变量，就是我们在var.css中设定的css变量

同理，我们看图片的css属性

```css
.image-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  transform: translate(-50%, -50%);
}
```

也是我们在 `var.css` 中设定的 css 变量

所以，我们可以直接在 VitePress 源码中，找到我们希望更改样式的组件，观察他们的 css 样式是否使用 css 变量，然后我们在 `var.css` 中进行更改即可

我们根据这个方法，改一下首页的按钮样式

### 实践，更改首页按钮样式
首页的按钮通过 `hero` 下的 `actions` 属性控制，通过 `actions.theme` 控制样式，默认是 `brand`，也就是绿色按钮，总共有三种模式：`brand`、`alt`、`sponsor`

VPButton 源码

通过分析源码，可以看到button的样式控制，通过传入的theme，计算动态classes，然后传给组件



这里就是brand模式下的button样式，可以看到使用了三个css变量，我们在var.css中对着三个样式进行改动



