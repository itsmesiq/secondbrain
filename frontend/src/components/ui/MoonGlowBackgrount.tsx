export default function MoonGlowBackground() {
    return (
        <svg
            width="392"
            height="430"
            viewBox="0 0 392 430"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <ellipse cx="195.5" cy="364" rx="254.5" ry="145" className="fill-notion-background" />
            <g opacity="0.5" style={{ mixBlendMode: 'hard-light' }}>
                <path
                    d="M195.5 247C336.056 247 450 311.919 450 392C450 400.525 448.707 408.878 446.229 417C425.436 348.833 321.093 297 195.5 297C69.9069 297 -34.4372 348.833 -55.2305 417C-57.7078 408.878 -59 400.525 -59 392C-59 311.919 54.9435 247 195.5 247Z"
                    className="fill-widget-accent/50 blur-md"
                />
            </g>
            <path
                d="M195.5 210C336.056 210 450 274.919 450 355C450 365.108 448.183 374.975 444.728 384.5C420.809 318.565 318.314 269 195.5 269C72.6854 269 -29.8099 318.564 -53.7285 384.5C-57.1838 374.975 -59 365.108 -59 355C-59 274.919 54.9435 210 195.5 210Z"
                className="fill-widget-accent blur-md"
            />
            <g style={{ mixBlendMode: 'plus-lighter' }}>
                <path
                    d="M195.5 219C336.056 219 450 283.919 450 364C450 365.842 449.939 367.675 449.819 369.5C444.744 291.967 332.824 230 195.5 230C58.1758 230 -53.7454 291.967 -58.8203 369.5C-58.9398 367.675 -59 365.842 -59 364C-59 283.919 54.9435 219 195.5 219Z"
                    className="fill-white blur-sm"
                />
            </g>
        </svg>
    );
}
