import {
    GoogleIcon,
    MysticGlyph,
    PixelBorderBL,
    PixelBorderBR,
    PixelBorderTL,
    PixelBorderTR,
} from '../icons';
import { SocialButton } from '../ui/SocialButton';

type AuthPannelProps = {
    onSignInWithGoogle: () => void;
};

export default function AuthPannel({ onSignInWithGoogle }: AuthPannelProps) {
    return (
        <article className="relative flex h-full max-h-[662px] w-full max-w-[800px] flex-col items-center justify-end border border-stroke-secondary bg-[radial-gradient(70.71%_70.71%_at_50%_50%,rgba(5,5,10,0)_30%,rgba(5,5,10,0.7)_100%),url('/images/etherea-auth-background.jpg')] bg-cover bg-center bg-no-repeat shadow-[0_0_40px_0_rgba(155,48,255,0.20),0_0_80px_0_rgba(0,0,0,0.90)]">
            <div className="relative z-10 mb-28 flex flex-col items-center gap-5">
                <div className="flex flex-col items-center gap-3">
                    <div className="relative inline-block h-12 w-12">
                        <div className="absolute inset-0 h-full w-full scale-110 rounded-full bg-etherea-purple opacity-60 blur-sm" />
                        <MysticGlyph className="relative h-12 w-12" />
                    </div>
                    <h1 className="font-orbitron text-lg leading-[150%] tracking-[4px] text-foreground uppercase">
                        Access Terminal
                    </h1>
                    <p className="font-mono text-sm tracking-[0.5px] text-text-secondary">
                        Entre em Etheria e continue sua jornada.
                    </p>
                    <div className="flex items-center gap-3.5 font-mono text-xs uppercase">
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-etherea-cyan shadow-[0_0_5px_0_#00E5FF]"></div>
                            <span className="text-etherea-cyan">System online</span>
                        </div>
                        <span className="text-text-muted">Signal Stable</span>
                    </div>
                </div>
                <div className="h-0.5 w-full bg-[linear-gradient(90deg,rgba(42,31,74,0)_0%,#2A1F4A_30%,#9B30FF_50%,#2A1F4A_70%,rgba(42,31,74,0)_100%)]"></div>
                <SocialButton
                    icon={<GoogleIcon className="h-4 w-4" />}
                    onClick={onSignInWithGoogle}
                    cta="Continuar com o Google"
                />
            </div>
            <div className="absolute top-0 z-10 flex w-full items-center justify-between border-b border-stroke-secondary bg-surface/40 px-3.5 py-2 backdrop-blur-xs">
                <PixelBorderTL className="absolute top-0 left-0 h-3 w-3" />
                <PixelBorderTR className="absolute top-0 right-0 h-3 w-3" />
                <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                    ETH-01 // ACCESS NODE
                </span>
                <div className="flex items-center gap-1">
                    <div className="h-1 w-1 bg-etherea-purple shadow-[0_0_4px_0_#9B30FF]"></div>
                    <div className="h-1 w-1 bg-stroke-secondary"></div>
                    <div className="h-1 w-1 bg-stroke-secondary"></div>
                </div>
            </div>
            <div className="absolute bottom-0 z-10 flex w-full flex-col gap-1 border-t border-stroke-secondary bg-surface/10 px-3.5 py-3">
                <PixelBorderBL className="absolute bottom-0 left-0 h-3 w-3" />
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
                <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                    ETH-01 // ACCESS NODE
                </span>
                <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                    SECTOR: NEON DISTRICT
                </span>
                <span className="font-mono text-[10px] tracking-[2px] text-text-muted">
                    SIGNAL: STABLE
                </span>
            </div>
            <div className="absolute bottom-0 z-0 h-[60%] w-full bg-[linear-gradient(0deg,rgba(5,5,10,0.98)_0%,rgba(5,5,10,0.85)_50%,rgba(5,5,10,0)_100%)]"></div>
        </article>
    );
}
