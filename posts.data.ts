// @ts-ignore
import fs from "fs"
// @ts-ignore
import YAML from 'yaml'

// 抽取文章标题，日期，标签
function extraction(txt:string){
    try {
        return YAML.parse(txt)
    }catch {
        console.log('无法解析yaml数据',`数据源:${txt}`)
        return
    }
}
// 日期排序
function formatDateString(dateStr:any) {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
function createDateObject(formattedDateStr:any) {
    return new Date(formattedDateStr);
}
function sortDateStringArray(datesArray:any) {
    return datesArray.map((dateStr:any) => {
        const formattedDateStr = formatDateString(dateStr.date);
        return { originalStr: dateStr, dateObject: createDateObject(formattedDateStr) };
    }).sort((a:any, b:any) => b.dateObject - a.dateObject).map((item:any) => item.originalStr);
}
function readDirectory(dir) {
    let arr = []
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            // 排除.git目录
            if(file != '.git'){
                let txt = fs.readFileSync(`./posts/${file}`)
                if(txt.toString().split('---')[1]){
                    let txtObj = extraction(txt.toString().split('---')[1])
                    arr.push({
                        src: file,
                        ...txtObj
                    })
                }
            }
        });

    } catch (err) {
        console.log("发生错误");
    }
    return sortDateStringArray(arr)
}
export default {
    load() {
        return {
            posts: readDirectory('./posts')
        }
    }
}