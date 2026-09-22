'use client';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';

import { EthereaSystem, NotionIcon } from '@/components/icons';

import { EthereaLogoV2 } from '../images';

type DashboardSection = 'widgets' | 'templates' | 'account';

interface SidebarProps {
    notionConnected: boolean | null;
    handleNotionConnect: () => Promise<void>;
    activeSection: DashboardSection;
    onSectionChange: (section: DashboardSection) => void;
}

export default function Sidebar({
    notionConnected,
    handleNotionConnect,
    activeSection,
    onSectionChange,
}: SidebarProps) {
    return (
        <aside className="relative flex h-screen w-[20%] flex-col items-center gap-8 border-r border-stroke-secondary bg-background py-8">
            <div className="flex w-full flex-col items-center border-b border-stroke-secondary">
                <Image
                    src={EthereaLogoV2}
                    alt="Etherea Logo"
                    width={200}
                    height={100}
                    className="mb-8"
                />
            </div>

            <div className="flex w-full flex-col items-center gap-4">
                <button
                    type="button"
                    onClick={() => onSectionChange('widgets')}
                    className={`flex w-full cursor-pointer items-center gap-2.5 border-l-2 py-5 pl-8 text-center font-orbitron text-xs font-light tracking-[2px] uppercase transition-colors duration-600 ${activeSection === 'widgets' ? 'border-etherea-purple bg-surface text-etherea-purple' : 'border-transparent text-text-primary/30 hover:bg-card/15 hover:text-text-primary'}`}
                >
                    <span className="text-xs text-text-muted">01</span>
                    <span>Widgets</span>
                </button>
                <button
                    type="button"
                    onClick={() => onSectionChange('templates')}
                    className={`flex w-full cursor-pointer items-center gap-2.5 border-l-2 py-5 pl-8 text-center font-orbitron text-xs font-light tracking-[2px] uppercase transition-colors duration-600 ${activeSection === 'templates' ? 'border-etherea-purple bg-surface text-etherea-purple' : 'border-transparent text-text-primary/30 hover:bg-card/15 hover:text-text-primary'}`}
                >
                    <span className="text-xs text-text-muted">01</span>
                    <span>Templates</span>
                </button>
                <button
                    type="button"
                    onClick={() => onSectionChange('account')}
                    className={`flex w-full cursor-pointer items-center gap-2.5 border-l-2 py-5 pl-8 text-center font-orbitron text-xs font-light tracking-[2px] uppercase transition-colors duration-600 ${activeSection === 'account' ? 'border-etherea-purple bg-surface text-etherea-purple' : 'border-transparent text-text-primary/30 hover:bg-card/15 hover:text-text-primary'}`}
                >
                    <span className="text-xs text-text-muted">01</span>
                    <span>Account</span>
                </button>
            </div>

            {notionConnected === false && (
                <div className="flex flex-col items-center gap-4">
                    <p className="max-w-[224px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                        Conecte sua conta Notion para continuar
                    </p>
                    <button
                        onClick={handleNotionConnect}
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-6 rounded-full bg-foreground px-10 py-3 transition-opacity hover:opacity-90 active:opacity-80"
                    >
                        <NotionIcon className="h-6 w-6" />
                        <span className="font-sans text-base leading-[120%] font-semibold tracking-[2.4px] whitespace-nowrap text-background">
                            Conectar Notion
                        </span>
                    </button>
                </div>
            )}

            {notionConnected === null && (
                <div className="flex items-center justify-center gap-2">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    <span className="max-w-[224px] text-center font-sans text-sm font-light tracking-[2.4px] text-foreground">
                        Verificando conexão...
                    </span>
                </div>
            )}

            <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-stroke-secondary px-6 py-3">
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    <EthereaSystem className="size-6" />
                    <span>ETHEREA SYSTEM //</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-etherea-cyan uppercase">
                    <div className="size-1.5 rounded-full bg-etherea-cyan"></div>
                    <span>Online</span>
                </div>
            </div>
        </aside>
    );
}
