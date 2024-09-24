import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Linkedin } from "lucide-react"
import Xicon from "@/app/XIcon.svg"
import {  LinkedinShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

import Image from "next/image"

export default function ShareButton({url}:{url:string}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-4">
        <TwitterShareButton  url={url} title="Look at this amazing picture" >
        <Image src={Xicon} alt="Twitter" width={20} height={20} />
        </TwitterShareButton>
          <LinkedinShareButton url={url} title="Look at this amazing picture" >   
            <Linkedin className="h-5 w-5 text-[#0077B5]" /> 
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title="Look at this amazing picture" > 
            <WhatsappIcon size={20} />
            </WhatsappShareButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}