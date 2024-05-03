// @ts-ignore
import fs from "fs"
// @ts-ignore
import YAML from 'yaml'

// 抽取文章标题，日期，标签
function extraction(txt:string){
    return YAML.parse(txt)
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
            let txt = fs.readFileSync(`./posts/${file}`)
            let txtObj = extraction(txt.toString().split('---')[1])
            arr.push({
                src: file,
                ...txtObj
            })
        });

    } catch (err) {
        console.log(err);
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