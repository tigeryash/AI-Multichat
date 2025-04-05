import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_PROVIDERS } from "@/lib/ai-providers";
import { Fragment } from "react";

const AISelelectMenu = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an AI" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {AI_PROVIDERS.map((provider) => (
            <Fragment key={provider.name}>
              <SelectLabel>{provider.name}</SelectLabel>
              {provider.models.map((model, idx) => (
                <SelectItem key={model.name + idx} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </Fragment>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AISelelectMenu;
