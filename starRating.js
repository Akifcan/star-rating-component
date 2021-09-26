class StarRating extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        const element = document.createElement('div')
        const size = this.getAttribute('size') ? this.getAttribute('size') : '32'
        console.log(size)
        element.innerHTML = `
           <style>
                .c-icon.stroke{
                    stroke: black;
                }
           </style>
            <svg style="width: 0; height: 0;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
                <defs>
                    <mask id="half">
                        <rect x="0" y="0" width="${size}" height="${size}" fill="grey" />
                        <rect x="-50%" y="0" width="${size}" height="${size}" fill="white" />
                    </mask>

                    <mask id="remain">
                        <rect x="0" y="0" width="${size}" height="${size}" fill="grey" />
                    </mask>

                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="star">
                        <path
                            d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                    </symbol>
                </defs>
            </svg>

            <p class="c-rate">
            </p>
        `
        this.shadowRoot.append(element)
    }

    connectedCallback() {
        const stars = this.getAttribute('stars')
        const size = this.getAttribute('size') ? this.getAttribute('size') : '32'
        const stroke = this.getAttribute('stroke') != null ? 'stroke' : ''
        const color = this.getAttribute('color') != null ? this.getAttribute('color') : 'yellow'

        const maxStar = parseInt(this.getAttribute('maxStar'))
        const parent = this.shadowRoot.querySelector('.c-rate')

        function getNode(n, v) {
            n = document.createElementNS("http://www.w3.org/2000/svg", n);
            for (var p in v)
                n.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
            return n
        }

        for (let i = 0; i < parseInt(stars); i++) {
            const hasHalf = stars.includes('.')
            const svg = getNode("svg", { class: `c-icon ${stroke}`, style: `fill: ${color}`, width: size, height: size });
            if (i === parseInt(stars) - 1 && hasHalf) {
                const u = getNode('use', { href: '#star', mask: 'url(#half)' });
                svg.appendChild(u)
            } else {
                const u = getNode('use', { href: '#star' });
                svg.appendChild(u)
            }
            parent.appendChild(svg)
        }
        for (let i = parseInt(stars) + 1; i <= maxStar; i++) {
            const svg = getNode("svg", { class: `c-icon ${stroke}`, style: `fill: ${color}`, width: size, height: size });
            const u = getNode('use', { href: '#star', mask: 'url(#remain)' });
            svg.appendChild(u)
            parent.appendChild(svg)
        }

    }

}

customElements.define('star-rating', StarRating)