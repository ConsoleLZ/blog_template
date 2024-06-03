interface Social{
    name:string
    icon:string
    codeUrl?:string
    srcUrl?:string
}

interface Pages{
    name:string
    to:string
}

interface Link{
    name:string
    url:string
    imgSrc:string
}

interface ExtLinks{
    leftText:string
    rightText:string
    bgColor:string
    href:string
}

interface Article_recommend{
    title:string
    introduction:string
    tags:string
    date:string
    url:string
}

interface Footer_info{
    title:string
    info:string
}

interface ConfigType{
    title:string
    sub_title:string
    avatar:string
    social?:Array<Social>
    pages:Array<Pages>
    link:Array<Link>
    extLinks:Array<ExtLinks>
    article_recommend:Array<Article_recommend>
    footer_info:Array<Footer_info>
}

export type {
    ConfigType
}