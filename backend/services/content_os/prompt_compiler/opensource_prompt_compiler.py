from typing import List
from backend.services.content_os.prompt_compiler.universal_prompt_schema import SceneShotSpec, OpenSourceStackSpec

class OpenSourcePromptCompiler:
    """
    Compiles free-first open-source workflows utilizing FFmpeg CLI,
    Whisper transcription for auto-subtitles, and Piper TTS.
    """

    @classmethod
    def compile_spec(cls, composition_name: str, shots: List[SceneShotSpec]) -> OpenSourceStackSpec:
        ffmpeg_cmd = (
            f"ffmpeg -f concat -safe 0 -i inputs.txt -vf "
            f"\"scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1\" "
            f"-c:v libx264 -preset fast -crf 20 -c:a aac -b:a 192k out/{composition_name}.mp4"
        )
        whisper_cmd = f"whisper out/{composition_name}.mp4 --model medium --output_format srt --max_line_width 24"
        piper_cmd = f"echo '...' | piper --model en_US-lessac-medium --output_file voiceover.wav"

        keywords = ["coding screen", "dark terminal UI", "modern developer setup", "server racks neon", "ai agent flow"]

        return OpenSourceStackSpec(
            ffmpeg_concat_command=ffmpeg_cmd,
            whisper_transcription_command=whisper_cmd,
            piper_tts_command=piper_cmd,
            free_stock_keywords=keywords
        )
