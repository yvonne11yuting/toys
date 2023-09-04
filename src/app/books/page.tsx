import { Volume2 } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const Books = () => {
    return (
        <div className="pt-4 px-2">
            <Alert className="border-amber-400 bg-amber-50">
                <Volume2 color="#ffbb00" />
                <AlertTitle className="ml-2 p-1 text-stone-800">Join us!! 大家一起來唸書~</AlertTitle>
                <AlertDescription className="ml-2 mt-2 leading-relaxed text-stone-600">
                    「三日不讀書，面目可憎。」其實也沒這麼兇啦，大家來快樂唸書吧！<br />
                    地點會在雙北，歡迎有興趣的朋友一起分享書吧。<br />
                    書的種類不限，想看什麼就看什麼！<br />
                    有興趣的小夥伴可以聯繫我喔！<br />
                    <b className="text-amber-800">Email: <a target="_blank" href="mailto:yvonne11yuting@gmail.com" rel="noreferrer noopener">yvonne11yuting@gmail.com</a></b>
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default Books