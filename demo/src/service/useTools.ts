//@ts-nocheck
import { ref } from 'vue'

import Viewer from 'nsdt-3dconvert-viewer'

export const ViewerEvent = {
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

export const DefaultLightConfiguration = {
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

  const viewerInit = async (dom: any, fileId: any) => {
    const viewer = new Viewer(dom)
    viewerRef.value = viewer

    viewerRef.value.setLightConfiguration(DefaultLightConfiguration)
    await viewerRef.value.init()

    /**
     * 监听 进度 点击
     */
    viewerRef.value.on(ViewerEvent.LoadProgress, progressChange)
    viewerRef.value.on(ViewerEvent.ObjectClicked, selectObject)
    viewerRef.value.on(ViewerEvent.LoadComplete, loadComplete)

    if (fileId) await viewer.loadObjectByFileId(fileId, { enableCaching: true })
  }

  return {
    loadProgress,         // 加载模型进度
    loading,              // 是否正在加载中
    vieweMode,            // 显示模式
    sunConfig,            // 光照参数
    viewerInit,           // viewer 初始化                  Function
    onZYUp,               // z|y 轴向上切换函数              Function 
    onCut,                // 剖切盒打开|关闭函数             Function
    onVieweModeChange,    // 显示模式切换函数                Function
    sunConfigChange,      // 光照参数变化函数                Function
  }
}
