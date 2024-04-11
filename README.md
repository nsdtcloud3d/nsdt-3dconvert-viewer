<h1><a href="https://3dconvert.nsdt.cloud"><p align="center"><img alt="3dconvert viewer sdk" src="https://3dconvert.nsdt.cloud/convert/docapi/3dconvertlog.png" height="330px" width="304px" /></p></a></h1>


![deploy](https://3dconvert.nsdt.cloud/convert/docapi/demopage.png)



## 概述

3dconvert-viewer.js SDK是一款功能强大、易于集成的3D模型展示工具，它以<a href="https://3dconvert.nsdt.cloud" target="_blank">3D模型在线转换平台</a>的服务为基础，为广大开发者提供了一个高效、便捷的3D模型展示解决方案。通过这款SDK，客户可以轻松地将自己的3D模型集成到Web系统中，实现高质量的3D展示效果。

该SDK具有一系列令人瞩目的功能特点，包括但不限于光照、相机、剖切和拾取等。光照功能可以根据客户需求调整模型的光照效果，使得模型在展示时更加逼真；相机功能则允许用户自由调整视角和焦距，获得最佳的观看体验；剖切功能可以方便地对模型进行切割和查看内部结构，满足特定的展示需求；拾取功能则支持用户对模型进行交互操作，如点击、拖动等，增强了用户与模型的互动性。

3dconvert-viewer.js SDK的显示效果也非常出色。它采用了先进的渲染技术和优化算法，能够确保在Web环境中流畅地展示大型、复杂的3D模型。同时，SDK还支持多种格式的3D模型导入，方便客户使用现有的模型资源。

对于希望将3D模型集成到自己Web系统的客户来说，3dconvert-viewer.js SDK是一个理想的选择。它提供了简单易用的API接口和详细的文档支持，免服务端，使得开发者能够轻松地将其集成到现有的系统中。此外，SDK还提供了灵活的定制选项，可以根据客户的具体需求进行个性化设置，满足各种复杂的展示需求。

##  主要功能与特性

1. **模型加载**：通过指定模型资源fild，加载并显示3D模型。
2. **交互控制**：支持旋转、缩放、平移等基本视图控制，以及光照、视角、剖切、模型选择等高级设置。
3. **扩展性良好**：支持多种3D模型格式，可根据项目需求定制拓展功能。
   
## 快速开始

### 安装

```shell
$ npm install nsdt-3dconvert-viewer
```

```js
// 使用
import Viewer from 'nsdt-3dconvert-viewer';
```

### 使用

**html 代码**

```html
...
 <div id="viewer-container" style="width: 100%;height: 600px;border: 1px solid #000;"></div>
...
```

**js 代码**

```javascript
// 引入3dconvert-viewer 
import Viewer from 'nsdt-3dconvert-viewer';

async function load3dModal() {
    // 创建Viewer实例，初始化参数为 Dom id 或者 HTMLElement
    const viewer = new Viewer('viewer-container');
	
    // 初始化
    await viewer.init();
    
    // 文件id 详细过程请参考：【获取fileId】章节
    const fileId = '687e6d1ec0'
    
    // 加载模型
    await viewer.loadObjectByFileId(fileId,{ enableCaching: false })

    // 注册事件监听器
    viewer.on('load-progress', (e) => {
      console.log('模型加载进度', e);
    });
}

load3dModal()
```

### 资源

**开发demo** [下载](https://3dx.nsdt.cloud/download/3dconvert-viewer-demo.zip)

**3D大文件转换客户端** [下载](https://3dx.nsdt.cloud/download/3dconvert-viewer-demo.zip)

**BIM/CAD插件** [下载](https://3dconvert.nsdt.cloud/conv/plugin)

**3Dconvert 服务私有化部署** [查看](https://3dconvert.nsdt.cloud/conv/production)

**stp viewer** [查看](https://3dconvert.nsdt.cloud/convert/docapi/stpviewer/start.html)

**3D模型在线转换** [查看](https://3dconvert.nsdt.cloud)

**GLTF在线编辑器** [查看](https://gltf.nsdt.cloud)



## 获取fileId

`3dconvert-viewer.js` SDK 是`3dconvert`平台提供的3D模型web端预览组件。

这款SDK的设计以文件资源为核心。当您在`3dconvert`平台上传3D模型后，平台会为您的模型分配一个唯一的ID（`fileId`）。要查看这个`fileId`，您可以登录`3dconvert平台`，进入`我的工作空间`，然后点击`我的上传`，在相应的文件信息中找到`fileId`字段。

![deploy](https://3dconvert.nsdt.cloud/convert/docapi/fileidget.png)

 使用SDK加载与`fileId`对应的3D模型非常简单，只需编写少量代码（请参考示例代码）。如果您希望调整模型的展示效果或实现更个性化的功能，请查阅详细的API。

## Vewer API

####  创建 Viewer 对象

```javascript
// 创建 Viewer 对象

const viewer = new Viewer(container: HTMLElement, params: ViewerParams);

```

- `container`: Viewer绑定的HTML元素

- params: ViewerParams Viewer配置

  ```javascript
  interface ViewerParams {
    showStats?: boolean
    environmentSrc?: Asset | string
  	verbose: boolean
  }
  ```

  - `showStats`: 启用/禁用viewer画布左上角的统计窗口
  - `environmentSrc`: 允许用户为viewer场景定义环境纹理，形式为equirectangular HDRI
  - `verbose`: 在控制台中显示其他信息和警告。

在开始使用viewer之前，您需要像下面这样对其进行初始化：

```
await viewer.init()
```

该函数是异步的，因为在这一步骤中，viewer要么加载所需的资产（如您可能在`params`中提供的HDRI），要么生成运行时资产。

#### 事件绑定 ViewerEvent

```javascript
on(eventType: ViewerEvent, handler: (arg) => void)
```

- `eventType` : ViewerEvent

  ```tsx
  enum ViewerEvent {
    ObjectClicked = 'object-clicked',
    ObjectDoubleClicked = 'object-doubleclicked',
    DownloadComplete = 'download-complete'
    LoadComplete = 'load-complete',
    LoadProgress = 'load-progress',
    LoadCancelled = 'load-cancelled',
    UnloadComplete = 'unload-complete',
    UnloadAllComplete = 'unload-all-complete',
    Busy = 'busy',
    SectionBoxChanged = 'section-box-changed'
    SectionBoxUpdated = 'section-box-updated'
  }
  ```

- `handler`: 回调函数

#### 加载和卸载模型

Viewer通过文件id加载存储在服务端的模型

```javascript
loadObject(fileId: string, {enableCaching?: boolean}): Promise<void>

```

- `fileId`: 模型对应的文件id
- `enableCaching`: 启用/禁用浏览器中的数据缓存。*默认为true*

卸载模型

```tsx
unloadObject(): Promise<void>
```

#### 相机控制

#####  控制视角

```tsx
setView(view: CanonicalView)
```

用于操作相机的视角

- view: CanonicalView：

  ```tsx
  type CanonicalView =
    | 'front'
    | 'back'
    | 'up'
    | 'top'
    | 'down'
    | 'bottom'
    | 'right'
    | 'left'
    | '3d'
    | '3D'
  ```

##### 透视/正交相机切换

```tsx
toggleCameraProjection()
```

#####  Z/Y轴向上切换

```tsx
toggleZXAxisUpFixed()
```

####  选中模型对象

设置模型选中并且高亮

```tsx
selectObjects(objects:[]<objectId>);
```

- `objects`： objectId集合

当用户在viewer中点击某个3d对象时，监听`ObjectClicked`或`ObjectDoubleClicked`事件的回调函数会收到`SelectionEvent`信息：

```ts
type SelectionEvent = {
  multiple: boolean
  event?: PointerEvent
  hits: Array<{
    guid?: string
    object: Record<string, unknown>
    point: Vector3
  }>
}
```

- 当没有点击对象时，*则会使用 `null` 作为参数触发 `ObjectClicked` 事件*

作为一个简单的例子，在单击对象时将其高亮并且聚焦：

```tsx
viewer.on(ViewerEvent.ObjectClicked, (selectionInfo: SelectionEvent) => {
  if (selectionInfo) {
  	// 选中对象 并且高亮对象
  	viewer.selectObjects([selectionInfo.hits[0].object.id])
	// 对象聚焦
    viewer.zoom([selectionInfo.hits[0].object.id ])
  }
	else {
		//没有点击的对象。聚焦整个场景
		viewer.zoom()	
	}
})
```

####  剖切盒

Viewer提供了一个可配置的剪切盒功能，可用于查看场景的部分内容。

```tsx
setSectionBox(
  box?: {
    min: { x: number; y: number; z: number }
    max: { x: number; y: number; z: number }
  },
  offset?: number
)
```

使用即时盒子定义设置切割盒的尺寸。

- `box`：切割盒尺寸的盒子定义。如果未提供此参数，则切割盒将调整为整个场景大小。
- `offset`：用于增加/减小切割盒的可选乘数，默认为`0.05`。

```tsx
setSectionBoxFromObjects(objectIds: string[], offset?: number)**
```

根据一组对象设置切割盒的尺寸。

- `objectIds`：我们希望调整切割盒的对象ID。切割盒的尺寸将是其组合轴对齐边界框的结果。
- `offset`：用于增加/减小切割盒的可选乘数，默认为`0.05`。

启用切割盒。

```tsx
sectionBoxOn(): void
```

禁用切割盒。

```tsx
sectionBoxOff(): void
```

切换切割盒的开/关状态。

```tsx
toggleSectionBox(): void
```

#### 光照控制

设置光照

```tsx
setLightConfiguration(config: LightConfiguration): void
```

**config: LightConfiguration**：

```tsx
interface LightConfiguration {
  enabled?: boolean
  castShadow?: boolean
  intensity?: number
  color?: number
  indirectLightIntensity?: number
}

interface SunLightConfiguration extends LightConfiguration {
  elevation?: number
  azimuth?: number
  radius?: number
}
```

- `enabled`：启用/禁用太阳直射光
- `castShadow`：启用/禁用太阳光投射阴影
- `intensity`：太阳光的强度
- `color`：太阳光的颜色（以 int 类型表示）
- `indirectLightIntensity`：环境光强度（IBL）的强度
- `elevation`：太阳球面角（以弧度为单位）
- `azimuth`：太阳球面方位角（以弧度为单位）
- `radius`：从场景包围球半径的偏移距离

系统默认配置：

```tsx
export const DefaultLightConfiguration = {
  enabled: true, // 太阳阴影是否开启
  castShadow: false,
  intensity: 3, // 太阳光强度
  color: 0xffffff,
  elevation: 1.8, // 太阳高度
  azimuth: 0.75, // 太阳方位角
  radius: 0,
  indirectLightIntensity: 2,
  shadowcatcher: false,
};
```

## 详细开发示例

### 代码示例

我们以`Vue3` `hooks`方式开发一个`viewerHook`, 该**hook**是的主要功能有`加载模型`、`模型加载进度`、`模型Z轴|Y轴向上切换`、`模型显示模式切换`、`模型光照设置`。

直接上代码`viewerHooks.ts:

```typescript
//@ts-nocheck
import { ref } from 'vue'
import Viewer from '../lib/3dconvert-viewer.js'

const ViewerEvent = {
  ObjectClicked: 'object-clicked',
  ObjectDoubleClicked: 'object-doubleclicked',
  DownloadComplete: 'download-complete',
  LoadComplete: 'load-complete',
  LoadProgress: 'load-progress',
  UnloadComplete: 'unload-complete',
  LoadCancelled: 'load-cancelled',
  UnloadAllComplete: 'unload-all-complete',
  Busy: 'busy',
  SectionBoxChanged: 'section-box-changed',
  SectionBoxUpdated: 'section-box-updated',
}

const DefaultLightConfiguration = {
  enabled: true,
  castShadow: false, // 太阳阴影是否开启
  intensity: 3, // 太阳光强度
  color: 0xffffff,
  elevation: 1.8, // 太阳高度
  azimuth: 0.75, // 太阳方位角
  radius: 0,
  indirectLightIntensity: 2,
  shadowcatcher: false,
}

export const useViewer = function () {
  const viewerRef = ref<any>()

  /***
   * y轴向上和z轴向上切换
   */
  const yup = ref(false) // 默认z轴向上
  const onZYUp = () => {
    viewerRef.value.toggleZXAxisUpFixed()
    const up = viewerRef.value?.cameraHandler?.camera?.up
    yup.value = up.y === 1
  }

  /**
   * viewer 显示模型切换  3d模型/看图模式
   */
  const vieweMode = ref<number>(1)
  const onVieweModeChange = () => {
    vieweMode.value = vieweMode.value === 1 ? 2 : 1
    viewerRef.value.toggleViewerMode()
  }

  /**
   * 剖切盒
   */
  const onCut = () => {
    viewerRef.value.setSectionBox()
    viewerRef.value.toggleSectionBox()
  }

  /**
   * 光照变化
   * @param config
   */
  const sunConfig = ref({ ...DefaultLightConfiguration })
  const sunConfigChange = config => {
    sunConfig.value = config
    setTimeout(() => {
      viewerRef.value.setLightConfiguration(sunConfig.value)
    }, 60)
  }

  /**
   * 进度，及是否加载完成
   */
  const loadProgress = ref<number>(0)
  const loading = ref<boolean>(false)

  const progressChange = evt => {
    loading.value = (evt?.progress || 0) > 0 && (evt?.progress || 0) < 100
    loadProgress.value = ((evt?.progress || 0) * 100).toFixed(2)
  }
  const loadComplete = () => (loading.value = false)

  /**
   * 选中 模型对象 模型高亮
   * @param meshClickEvent
   */
  const selectObject = meshClickEvent => {
    const objects = (meshClickEvent?.hits || []).map(item => item.object.id)
    viewerRef.value.selectObjects(objects)
  }
  
  /**
   * viewer 初始化函数
   * @param fileId 文件id
   */
  const viewerInit = async (dom: any, fileId: any) => {
    const viewer = new Viewer(dom)
    viewerRef.value = viewer

    viewerRef.value.setLightConfiguration(DefaultLightConfiguration)
    await viewerRef.value.init()

    /**
     * 监听：[ 进度 | 点击 | 完成 ] 事件
     */
    viewerRef.value.on(ViewerEvent.LoadProgress, progressChange)
    viewerRef.value.on(ViewerEvent.ObjectClicked, selectObject)
    viewerRef.value.on(ViewerEvent.LoadComplete, loadComplete)

    if (fileId) await viewer.loadObjectByFileId(fileId, { enableCaching: true })
  }

  return {
    viewerInit,           // viewer 初始化函数             Function
    loadProgress,         // 加载模型进度
    loading,              // 是否正在加载中
    sunConfig,            // 光照参数
    vieweMode,            // 显示模式
    
  	sunConfigChange,      // 光照参数变化函数                Function
    onVieweModeChange,    // 显示模式切换函数                Function
    onZYUp,               // z|y 轴向上切换函数             Function 
    onCut,                // 剖切盒打开|关闭函数             Function
  }
}

```

在vue组件中使用`viewerHook`示例代码如下

```tsx
<template>
    ....
</template>

<script setup lang="ts">
import { useViewer } from  './hooks/viewerHooks'
    
/**
 * Viewer use Function
 */
const {
  loadProgress,     
  loading,          
  vieweMode,        
  sunConfig,        
  viewerInit,       
  onZYUp,           
  onCut,            
  onVieweModeChange,
  sunConfigChange,  
} = useViewer()

// 文件id
const fileId = 'cb1224158a'

onMounted(async () => {
  await viewerInit('share3dviewer', fileId)
})

....
</script>
```



### 完整代码资源

您可以通过以下地址获取

[下载 3dconvert-viewer-demo.zip](https://3dx.nsdt.cloud/download/3dconvert-viewer-demo.zip)

这是一个完整的`Vue3`项目，下载解压运行之后可以直接查看预览效果，并且Viewer对象与模型的交互都已经做好，可以体验交互！

使用方法

```shell
yarn 
yarn dev
```

or npm

```
npm install
npm run dev
```

访问 `http://localhost:5175`

## 联系我们

如果有SDK**使用**上的疑问或者需要对**SDK功能进行个性化的扩展**，请联系我们

![contact](https://3dconvert.nsdt.cloud/convert/docapi/wmwx.jpg)

## 3D转换工具

<div style="font-size: 16px; font-weight: 600; color: #0266f2">GLTF</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/gltf" target="_blank">GLB转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/gltf" target="_blank">PLY转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/gltf" target="_blank">STL转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/gltf" target="_blank">OBJ转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/gltf" target="_blank">OFF转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/gltf" target="_blank">DAE转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/gltf" target="_blank">FBX转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/gltf" target="_blank">DXF转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/gltf" target="_blank">IFC转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/gltf" target="_blank">XYZ转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/gltf" target="_blank">PCD转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/gltf" target="_blank">LAS转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/gltf" target="_blank">LAZ转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/gltf" target="_blank">STP转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/gltf" target="_blank">STEP转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/gltf" target="_blank">3DXML转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/gltf" target="_blank">IGES转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/gltf" target="_blank">IGS转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/gltf" target="_blank">SHP转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/gltf" target="_blank">GEOJSON转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/gltf" target="_blank">XAML转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/gltf" target="_blank">PTS转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/gltf" target="_blank">ASC转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/gltf" target="_blank">BREP转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/gltf" target="_blank">FCSTD转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/gltf" target="_blank">BIM转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/gltf" target="_blank">USDZ转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/gltf" target="_blank">PDB转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/gltf" target="_blank">VTK转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/gltf" target="_blank">SVG转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/gltf" target="_blank">WRL转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/gltf" target="_blank">3DM转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/gltf" target="_blank">3DS转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/gltf" target="_blank">AMF转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/gltf" target="_blank">3MF转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/gltf" target="_blank">DWG转GLTF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">OBJ</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/obj" target="_blank">GLB转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/obj" target="_blank">GLTF转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/obj" target="_blank">PLY转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/obj" target="_blank">STL转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/obj" target="_blank">OFF转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/obj" target="_blank">DAE转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/obj" target="_blank">FBX转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/obj" target="_blank">DXF转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/obj" target="_blank">IFC转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/obj" target="_blank">XYZ转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/obj" target="_blank">PCD转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/obj" target="_blank">LAS转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/obj" target="_blank">LAZ转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/obj" target="_blank">STP转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/obj" target="_blank">STEP转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/obj" target="_blank">3DXML转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/obj" target="_blank">IGES转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/obj" target="_blank">IGS转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/obj" target="_blank">SHP转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/obj" target="_blank">GEOJSON转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/obj" target="_blank">XAML转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/obj" target="_blank">PTS转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/obj" target="_blank">ASC转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/obj" target="_blank">BREP转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/obj" target="_blank">FCSTD转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/obj" target="_blank">BIM转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/obj" target="_blank">USDZ转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/obj" target="_blank">PDB转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/obj" target="_blank">VTK转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/obj" target="_blank">SVG转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/obj" target="_blank">WRL转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/obj" target="_blank">3DM转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/obj" target="_blank">3DS转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/obj" target="_blank">AMF转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/obj" target="_blank">3MF转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/obj" target="_blank">DWG转OBJ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">GLB</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/gltf/to/glb" target="_blank">GLTF转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/glb" target="_blank">PLY转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/glb" target="_blank">STL转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/glb" target="_blank">OBJ转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/glb" target="_blank">OFF转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/glb" target="_blank">DAE转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/glb" target="_blank">FBX转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/glb" target="_blank">DXF转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/glb" target="_blank">IFC转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/glb" target="_blank">XYZ转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/glb" target="_blank">PCD转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/glb" target="_blank">LAS转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/glb" target="_blank">LAZ转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/glb" target="_blank">STP转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/glb" target="_blank">STEP转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/glb" target="_blank">3DXML转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/glb" target="_blank">IGES转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/glb" target="_blank">IGS转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/glb" target="_blank">SHP转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/glb" target="_blank">GEOJSON转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/glb" target="_blank">XAML转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/glb" target="_blank">PTS转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/glb" target="_blank">ASC转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/glb" target="_blank">BREP转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/glb" target="_blank">FCSTD转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/glb" target="_blank">BIM转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/glb" target="_blank">USDZ转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/glb" target="_blank">PDB转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/glb" target="_blank">VTK转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/glb" target="_blank">SVG转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/glb" target="_blank">WRL转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/glb" target="_blank">3DM转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/glb" target="_blank">3DS转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/glb" target="_blank">AMF转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/glb" target="_blank">3MF转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/glb" target="_blank">DWG转GLB&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">PLY</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/ply" target="_blank">GLB转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/ply" target="_blank">GLTF转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/ply" target="_blank">STL转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/ply" target="_blank">OBJ转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/ply" target="_blank">OFF转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/ply" target="_blank">DAE转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/ply" target="_blank">FBX转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/ply" target="_blank">DXF转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/ply" target="_blank">IFC转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/ply" target="_blank">XYZ转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/ply" target="_blank">PCD转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/ply" target="_blank">LAS转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/ply" target="_blank">LAZ转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/ply" target="_blank">STP转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/ply" target="_blank">STEP转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/ply" target="_blank">3DXML转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/ply" target="_blank">IGES转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/ply" target="_blank">IGS转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/ply" target="_blank">SHP转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/ply" target="_blank">GEOJSON转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/ply" target="_blank">XAML转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/ply" target="_blank">PTS转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/ply" target="_blank">ASC转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/ply" target="_blank">BREP转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/ply" target="_blank">FCSTD转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/ply" target="_blank">BIM转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/ply" target="_blank">USDZ转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/ply" target="_blank">PDB转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/ply" target="_blank">VTK转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/ply" target="_blank">SVG转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/ply" target="_blank">WRL转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/ply" target="_blank">3DM转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/ply" target="_blank">3DS转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/ply" target="_blank">AMF转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/ply" target="_blank">3MF转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/ply" target="_blank">DWG转PLY&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">STL</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/stl" target="_blank">GLB转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/stl" target="_blank">GLTF转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/stl" target="_blank">PLY转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/stl" target="_blank">OBJ转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/stl" target="_blank">OFF转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/stl" target="_blank">DAE转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/stl" target="_blank">FBX转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/stl" target="_blank">DXF转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/stl" target="_blank">IFC转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/stl" target="_blank">XYZ转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/stl" target="_blank">PCD转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/stl" target="_blank">LAS转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/stl" target="_blank">LAZ转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/stl" target="_blank">STP转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/stl" target="_blank">STEP转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/stl" target="_blank">3DXML转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/stl" target="_blank">IGES转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/stl" target="_blank">IGS转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/stl" target="_blank">SHP转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/stl" target="_blank">GEOJSON转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/stl" target="_blank">XAML转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/stl" target="_blank">PTS转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/stl" target="_blank">ASC转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/stl" target="_blank">BREP转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/stl" target="_blank">FCSTD转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/stl" target="_blank">BIM转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/stl" target="_blank">USDZ转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/stl" target="_blank">PDB转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/stl" target="_blank">VTK转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/stl" target="_blank">SVG转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/stl" target="_blank">WRL转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/stl" target="_blank">3DM转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/stl" target="_blank">3DS转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/stl" target="_blank">AMF转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/stl" target="_blank">3MF转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/stl" target="_blank">DWG转STL&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">XYZ</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/xyz" target="_blank">GLB转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/xyz" target="_blank">GLTF转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/xyz" target="_blank">PLY转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/xyz" target="_blank">STL转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/xyz" target="_blank">OBJ转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/xyz" target="_blank">OFF转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/xyz" target="_blank">DAE转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/xyz" target="_blank">FBX转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/xyz" target="_blank">DXF转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/xyz" target="_blank">IFC转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/xyz" target="_blank">PCD转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/xyz" target="_blank">LAS转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/xyz" target="_blank">LAZ转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/xyz" target="_blank">STP转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/xyz" target="_blank">STEP转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/xyz" target="_blank">3DXML转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/xyz" target="_blank">IGES转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/xyz" target="_blank">IGS转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/xyz" target="_blank">SHP转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/xyz" target="_blank">GEOJSON转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/xyz" target="_blank">XAML转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/xyz" target="_blank">PTS转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/xyz" target="_blank">ASC转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/xyz" target="_blank">BREP转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/xyz" target="_blank">FCSTD转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/xyz" target="_blank">BIM转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/xyz" target="_blank">USDZ转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/xyz" target="_blank">PDB转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/xyz" target="_blank">VTK转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/xyz" target="_blank">SVG转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/xyz" target="_blank">WRL转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/xyz" target="_blank">3DM转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/xyz" target="_blank">3DS转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/xyz" target="_blank">AMF转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/xyz" target="_blank">3MF转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/xyz" target="_blank">DWG转XYZ&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">OFF</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/off" target="_blank">GLB转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/off" target="_blank">GLTF转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/off" target="_blank">PLY转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/off" target="_blank">STL转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/off" target="_blank">OBJ转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/off" target="_blank">DAE转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/off" target="_blank">FBX转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/off" target="_blank">DXF转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/off" target="_blank">IFC转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/off" target="_blank">XYZ转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/off" target="_blank">PCD转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/off" target="_blank">LAS转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/off" target="_blank">LAZ转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/off" target="_blank">STP转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/off" target="_blank">STEP转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/off" target="_blank">3DXML转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/off" target="_blank">IGES转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/off" target="_blank">IGS转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/off" target="_blank">SHP转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/off" target="_blank">GEOJSON转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/off" target="_blank">XAML转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/off" target="_blank">PTS转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/off" target="_blank">ASC转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/off" target="_blank">BREP转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/off" target="_blank">FCSTD转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/off" target="_blank">BIM转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/off" target="_blank">USDZ转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/off" target="_blank">PDB转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/off" target="_blank">VTK转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/off" target="_blank">SVG转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/off" target="_blank">WRL转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/off" target="_blank">3DM转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/off" target="_blank">3DS转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/off" target="_blank">AMF转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/off" target="_blank">3MF转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/off" target="_blank">DWG转OFF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">DAE</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/dae" target="_blank">GLB转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/dae" target="_blank">GLTF转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/dae" target="_blank">PLY转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/dae" target="_blank">STL转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/dae" target="_blank">OBJ转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/dae" target="_blank">OFF转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/dae" target="_blank">FBX转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/dae" target="_blank">DXF转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/dae" target="_blank">IFC转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/dae" target="_blank">XYZ转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/dae" target="_blank">PCD转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/dae" target="_blank">LAS转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/dae" target="_blank">LAZ转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/dae" target="_blank">STP转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/dae" target="_blank">STEP转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/dae" target="_blank">3DXML转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/dae" target="_blank">IGES转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/dae" target="_blank">IGS转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/dae" target="_blank">SHP转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/dae" target="_blank">GEOJSON转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/dae" target="_blank">XAML转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/dae" target="_blank">PTS转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/dae" target="_blank">ASC转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/dae" target="_blank">BREP转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/dae" target="_blank">FCSTD转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/dae" target="_blank">BIM转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/dae" target="_blank">USDZ转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/dae" target="_blank">PDB转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/dae" target="_blank">VTK转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/dae" target="_blank">SVG转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/dae" target="_blank">WRL转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/dae" target="_blank">3DM转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/dae" target="_blank">3DS转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/dae" target="_blank">AMF转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/dae" target="_blank">3MF转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/dae" target="_blank">DWG转DAE&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">AMF</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/amf" target="_blank">GLB转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/amf" target="_blank">GLTF转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/amf" target="_blank">PLY转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/amf" target="_blank">STL转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/amf" target="_blank">OBJ转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/amf" target="_blank">OFF转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/amf" target="_blank">DAE转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/amf" target="_blank">FBX转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/amf" target="_blank">DXF转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/amf" target="_blank">IFC转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/amf" target="_blank">XYZ转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/amf" target="_blank">PCD转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/amf" target="_blank">LAS转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/amf" target="_blank">LAZ转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/amf" target="_blank">STP转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/amf" target="_blank">STEP转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/amf" target="_blank">3DXML转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/amf" target="_blank">IGES转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/amf" target="_blank">IGS转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/amf" target="_blank">SHP转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/amf" target="_blank">GEOJSON转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/amf" target="_blank">XAML转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/amf" target="_blank">PTS转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/amf" target="_blank">ASC转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/amf" target="_blank">BREP转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/amf" target="_blank">FCSTD转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/amf" target="_blank">BIM转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/amf" target="_blank">USDZ转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/amf" target="_blank">PDB转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/amf" target="_blank">VTK转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/amf" target="_blank">SVG转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/amf" target="_blank">WRL转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/amf" target="_blank">3DM转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/amf" target="_blank">3DS转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/amf" target="_blank">3MF转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/amf" target="_blank">DWG转AMF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">3MF</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/3mf" target="_blank">GLB转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/3mf" target="_blank">GLTF转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/3mf" target="_blank">PLY转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/3mf" target="_blank">STL转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/3mf" target="_blank">OBJ转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/3mf" target="_blank">OFF转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/3mf" target="_blank">DAE转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/3mf" target="_blank">FBX转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/3mf" target="_blank">DXF转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/3mf" target="_blank">IFC转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/3mf" target="_blank">XYZ转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/3mf" target="_blank">PCD转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/3mf" target="_blank">LAS转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/3mf" target="_blank">LAZ转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/3mf" target="_blank">STP转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/3mf" target="_blank">STEP转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/3mf" target="_blank">3DXML转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/3mf" target="_blank">IGES转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/3mf" target="_blank">IGS转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/3mf" target="_blank">SHP转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/3mf" target="_blank">GEOJSON转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/3mf" target="_blank">XAML转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/3mf" target="_blank">PTS转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/3mf" target="_blank">ASC转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/3mf" target="_blank">BREP转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/3mf" target="_blank">FCSTD转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/3mf" target="_blank">BIM转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/3mf" target="_blank">USDZ转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/3mf" target="_blank">PDB转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/3mf" target="_blank">VTK转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/3mf" target="_blank">SVG转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/3mf" target="_blank">WRL转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/3mf" target="_blank">3DM转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/3mf" target="_blank">3DS转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/3mf" target="_blank">AMF转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/3mf" target="_blank">DWG转3MF&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">STEP</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/step" target="_blank">GLB转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/step" target="_blank">GLTF转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/step" target="_blank">PLY转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/step" target="_blank">STL转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/step" target="_blank">OBJ转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/step" target="_blank">OFF转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/step" target="_blank">DAE转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/step" target="_blank">FBX转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/step" target="_blank">DXF转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/step" target="_blank">IFC转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/step" target="_blank">XYZ转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/step" target="_blank">PCD转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/step" target="_blank">LAS转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/step" target="_blank">LAZ转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/step" target="_blank">STP转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/step" target="_blank">3DXML转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/iges/to/step" target="_blank">IGES转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/step" target="_blank">IGS转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/step" target="_blank">SHP转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/step" target="_blank">GEOJSON转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/step" target="_blank">XAML转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/step" target="_blank">PTS转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/step" target="_blank">ASC转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/step" target="_blank">BREP转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/step" target="_blank">FCSTD转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/step" target="_blank">BIM转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/step" target="_blank">USDZ转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/step" target="_blank">PDB转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/step" target="_blank">VTK转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/step" target="_blank">SVG转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/step" target="_blank">WRL转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/step" target="_blank">3DM转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/step" target="_blank">3DS转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/step" target="_blank">AMF转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/step" target="_blank">3MF转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/step" target="_blank">DWG转STEP&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>
------
<div style="font-size: 16px; font-weight: 600; color: #0266f2">IGES</div>
<div style="display: flex; justify-content: start; align-items: center;gap:10px; flex-wrap: wrap;">
<a href="https://3dconvert.nsdt.cloud/glb/to/iges" target="_blank">GLB转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/gltf/to/iges" target="_blank">GLTF转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ply/to/iges" target="_blank">PLY转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stl/to/iges" target="_blank">STL转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/obj/to/iges" target="_blank">OBJ转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/off/to/iges" target="_blank">OFF转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dae/to/iges" target="_blank">DAE转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fbx/to/iges" target="_blank">FBX转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dxf/to/iges" target="_blank">DXF转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/ifc/to/iges" target="_blank">IFC转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xyz/to/iges" target="_blank">XYZ转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pcd/to/iges" target="_blank">PCD转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/las/to/iges" target="_blank">LAS转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/laz/to/iges" target="_blank">LAZ转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/stp/to/iges" target="_blank">STP转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/step/to/iges" target="_blank">STEP转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dxml/to/iges" target="_blank">3DXML转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/igs/to/iges" target="_blank">IGS转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/shp/to/iges" target="_blank">SHP转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/geojson/to/iges" target="_blank">GEOJSON转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/xaml/to/iges" target="_blank">XAML转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pts/to/iges" target="_blank">PTS转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/asc/to/iges" target="_blank">ASC转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/brep/to/iges" target="_blank">BREP转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/fcstd/to/iges" target="_blank">FCSTD转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/bim/to/iges" target="_blank">BIM转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/usdz/to/iges" target="_blank">USDZ转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/pdb/to/iges" target="_blank">PDB转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/vtk/to/iges" target="_blank">VTK转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/svg/to/iges" target="_blank">SVG转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/wrl/to/iges" target="_blank">WRL转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3dm/to/iges" target="_blank">3DM转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3ds/to/iges" target="_blank">3DS转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/amf/to/iges" target="_blank">AMF转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/3mf/to/iges" target="_blank">3MF转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a><a href="https://3dconvert.nsdt.cloud/dwg/to/iges" target="_blank">DWG转IGES&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</a>
</div>