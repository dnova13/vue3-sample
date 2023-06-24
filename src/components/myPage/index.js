import { importFilesInFolder } from '@/utils/function'

const ext = 'vue'
const files = require.context('./', true, /\.(js|jsx|ts|tsx|vue)$/)
const modules = importFilesInFolder(ext, files)

export default modules
