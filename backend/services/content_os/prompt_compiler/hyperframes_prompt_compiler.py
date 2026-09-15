from typing import List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, HyperFramesSpec

class HyperFramesPromptCompiler:
    """
    Compiles HTML/CSS and GSAP timeline specifications for kinetic typography,
    data telemetry overlays, and benchmark comparisons.
    """

    @classmethod
    def compile_spec(cls, shots: List[SceneShotSpec], duration_sec: float = 30.0) -> HyperFramesSpec:
        html = """<div id="hyperframe-stage" class="stage-vertical">
  <div class="brand-badge">@future.aii__</div>
  <div class="content-container">
    <div id="hero-headline" class="kinetic-text"></div>
    <div id="telemetry-bar" class="progress-indicator"></div>
  </div>
</div>"""

        css = """body, html { margin: 0; padding: 0; background: #06090F; overflow: hidden; }
.stage-vertical { width: 1080px; height: 1920px; position: relative; font-family: 'Inter', sans-serif; }
.brand-badge { position: absolute; top: 160px; left: 80px; font-weight: 800; color: #F59E0B; letter-spacing: 2px; }
.content-container { position: absolute; top: 40%; left: 80px; right: 80px; text-align: center; }
.kinetic-text { font-size: 72px; font-weight: 900; color: #FFFFFF; line-height: 1.1; }
.progress-indicator { height: 8px; background: #10B981; margin-top: 40px; width: 0%; }"""

        gsap_code = f"""// HyperFrames GSAP Timeline for @future.aii__
const tl = gsap.timeline({{ defaults: {{ ease: "power3.out" }} }});
tl.from("#hero-headline", {{ duration: 0.6, scale: 0.8, opacity: 0, y: 50 }})
  .to("#telemetry-bar", {{ duration: {duration_sec}, width: "100%", ease: "linear" }}, 0);
"""

        return HyperFramesSpec(
            html_markup=html,
            css_styles=css,
            gsap_timeline_code=gsap_code,
            duration_sec=duration_sec
        )
