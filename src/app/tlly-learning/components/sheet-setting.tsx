import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Settings } from 'lucide-react';
import { useState } from 'react';

type SettingOptions = {
    bnnLast: string;
    bnnRatio: number;
    total: number;
};
interface SheetSettingProps {
    setting: SettingOptions;
    setSetting: (setting: SettingOptions) => void;
}

export function SheetSetting({ setting, setSetting }: SheetSettingProps) {
    const [bnnLast, setBnnLast] = useState(setting.bnnLast);
    const [bnnRatio, setBnnRatio] = useState(setting.bnnRatio);
    const [total, setTotal] = useState(setting.total);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Settings />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll lg:max-w-2xl">
                <SheetHeader>
                    <SheetTitle>Setting</SheetTitle>
                    <SheetDescription>You can customize the data setting here.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Last row in BNN
                        </Label>
                        <Input
                            value={bnnLast}
                            className="col-span-3"
                            autoComplete="off"
                            placeholder="Just leave it empty if you want to get all rows."
                            onChange={(e) => setBnnLast(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            BNN Ratio
                        </Label>
                        <Input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={bnnRatio}
                            className="col-span-3"
                            autoComplete="off"
                            placeholder="Just leave it empty if you want to get all rows."
                            onChange={(e) => setBnnRatio(Number(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Total
                        </Label>
                        <Input
                            type="number"
                            min="20"
                            max="100"
                            step="1"
                            value={total}
                            className="col-span-3"
                            autoComplete="off"
                            placeholder="Just leave it empty if you want to get all rows."
                            onChange={(e) => setTotal(Number(e.target.value))}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            onClick={() =>
                                setSetting({
                                    bnnLast,
                                    bnnRatio,
                                    total,
                                })
                            }
                        >
                            Save changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default SheetSetting;
