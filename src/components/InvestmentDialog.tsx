
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bitcoin, Coins, WalletCards } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sensorName: string;
  projectName: string;
}

const InvestmentDialog: React.FC<InvestmentDialogProps> = ({ open, onOpenChange, sensorName, projectName }) => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bitcoin' | 'ethereum' | 'usdc'>('bitcoin');
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      toast.success('Investment successful', {
        description: `You've invested ${amount} via ${paymentMethod} in ${projectName}.`,
      });
      setAmount('');
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "w-[95%] max-w-[95%] p-4 rounded-lg" : "sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>Invest in Carbon Offset Project</DialogTitle>
          <DialogDescription>
            Support sustainability by investing in the {projectName} project associated with {sensorName}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Coins className="h-4 w-4 text-slate-400" />
              </div>
              <Input 
                id="amount" 
                type="number" 
                placeholder="0.00" 
                className="pl-10" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                required
                inputMode="decimal"
              />
            </div>
            <p className="text-xs text-slate-500">Minimum investment: 0.001 BTC / 0.01 ETH / 10 USDC</p>
          </div>
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className={isMobile ? "grid grid-cols-1 gap-2" : "grid grid-cols-3 gap-2"}>
              <Button 
                type="button"
                variant={paymentMethod === 'bitcoin' ? 'default' : 'outline'} 
                className={paymentMethod === 'bitcoin' ? 'bg-amber-500' : ''}
                onClick={() => setPaymentMethod('bitcoin')}
              >
                <Bitcoin className="h-4 w-4 mr-2" />
                Bitcoin
              </Button>
              <Button 
                type="button"
                variant={paymentMethod === 'ethereum' ? 'default' : 'outline'} 
                className={paymentMethod === 'ethereum' ? 'bg-purple-600' : ''}
                onClick={() => setPaymentMethod('ethereum')}
              >
                <Coins className="h-4 w-4 mr-2" />
                Ethereum
              </Button>
              <Button 
                type="button"
                variant={paymentMethod === 'usdc' ? 'default' : 'outline'} 
                className={paymentMethod === 'usdc' ? 'bg-blue-600' : ''}
                onClick={() => setPaymentMethod('usdc')}
              >
                <WalletCards className="h-4 w-4 mr-2" />
                USDC
              </Button>
            </div>
          </div>
          
          <DialogFooter className={isMobile ? "flex-col space-y-2" : ""}>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className={isMobile ? "w-full" : ""}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className={`bg-primary text-primary-foreground ${isMobile ? "w-full" : ""}`} 
              disabled={!amount || isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Investment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentDialog;
