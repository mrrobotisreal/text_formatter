import { type FC, useState, useRef, useEffect } from 'react';
import TopNav from '@/components/top-nav';

const LinkedInTextFormatter: FC = () => {
  const [text, setText] = useState('');
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectionStart(e.target.selectionStart);
    setSelectionEnd(e.target.selectionEnd);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const formatText = (formatter: (text: string) => string) => {
    if (selectionStart === selectionEnd) return;

    const selectedText = text.substring(selectionStart, selectionEnd);
    const formattedText = formatter(selectedText);

    const newText =
      text.substring(0, selectionStart) +
      formattedText +
      text.substring(selectionEnd);

    setText(newText);

    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(
          selectionStart,
          selectionStart + formattedText.length
        );
      }
    }, 0);
  };

  const boldText = (text: string) => {
    const boldMap = {
      'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
      'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
      's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
      'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
      'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
      'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
      '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    };
    return text.split('').map((char: string) => boldMap[char as keyof typeof boldMap] || char).join('');
  };

  const italicText = (text: string) => {
    const italicMap = {
      'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪',
      'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
      's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
      'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐',
      'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙',
      'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
    };
    return text.split('').map((char: string) => italicMap[char as keyof typeof italicMap] || char).join('');
  };

  const monospaceText = (text: string) => {
    const monospaceMap = {
      'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒',
      'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
      's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣',
      'A': '𝙰', 'B': '𝙱', 'C': '𝙲', 'D': '𝙳', 'E': '𝙴', 'F': '𝙵', 'G': '𝙶', 'H': '𝙷', 'I': '𝙸',
      'J': '𝙹', 'K': '𝙺', 'L': '𝙻', 'M': '𝙼', 'N': '𝙽', 'O': '𝙾', 'P': '𝙿', 'Q': '𝚀', 'R': '𝚁',
      'S': '𝚂', 'T': '𝚃', 'U': '𝚄', 'V': '𝚅', 'W': '𝚆', 'X': '𝚇', 'Y': '𝚈', 'Z': '𝚉',
      '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
    };
    return text.split('').map((char: string) => monospaceMap[char as keyof typeof monospaceMap] || char).join('');
  };

  const strikethroughText = (text: string) => {
    return text.split('').map((char: string) => char + '\u0336').join('');
  };

  const underlineText = (text: string) => {
    return text.split('').map((char: string) => char + '\u0332').join('');
  };

  const getIndentationLevel = (line: string) => {
    const match = line.match(/^(\s+)/);
    if (!match) return 0;
    return Math.floor(match[1].length / 2);
  };

  const bulletList = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line: string) => {
      if (!line.trim()) return line;

      const level = getIndentationLevel(line);
      const trimmedLine = line.trimStart();
      const bulletSymbols = ['•', '◦', '▪', '▫', '◆'];
      const bulletSymbol = bulletSymbols[Math.min(level, bulletSymbols.length - 1)];

      const indentation = '  '.repeat(level);
      return `${indentation}${bulletSymbol} ${trimmedLine}`;
    }).join('\n');
  };

  const numberedList = (text: string) => {
    const lines = text.split('\n');
    const counters = [0, 0, 0, 0, 0];

    return lines.map((line: string) => {
      if (!line.trim()) return line;

      const level = getIndentationLevel(line);
      const trimmedLine = line.trimStart();

      for (let i = level + 1; i < counters.length; i++) {
        counters[i] = 0;
      }

      counters[level]++;

      let prefix: string;
      if (level === 0) {
        prefix = `${counters[level]}.`;
      } else if (level === 1) {
        prefix = `${String.fromCharCode(96 + counters[level])}.`;
      } else if (level === 2) {
        prefix = `${String.fromCharCode(8544 + counters[level] - 1)}.`;
      } else {
        prefix = `${String.fromCharCode(8226)}`;
      }

      const indentation = '  '.repeat(level);
      return `${indentation}${prefix} ${trimmedLine}`;
    }).join('\n');
  };

  const indentText = (text: string, indent: boolean = true) => {
    const lines = text.split('\n');
    return lines.map((line: string) => {
      if (!line.trim()) return line;
      if (indent) {
        return '  ' + line;
      } else {
        if (line.startsWith('  ')) {
          return line.substring(2);
        }
        return line;
      }
    }).join('\n');
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess('Text copied to clipboard!');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setCopySuccess('Text copied to clipboard!');
      } catch (err) {
        setCopySuccess('Failed to copy text');
        console.error('Failed to copy: ', err);
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <>
    <TopNav />
    <div className="flex flex-col p-6 max-w-4xl mx-auto">
      <p className="mb-4">Select text and apply formatting that works when pasted into LinkedIn, Twitter, Facebook, etc.</p>

      <div className="mb-4">
        <textarea
          ref={textAreaRef}
          className="w-full p-3 border border-gray-300 rounded-md h-64 font-sans"
          value={text}
          onChange={handleTextChange}
          onSelect={handleSelect}
          placeholder="Type or paste your text here..."
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => formatText(boldText)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
        >
          Bold
        </button>
        <button
          onClick={() => formatText(italicText)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 italic"
        >
          Italic
        </button>
        <button
          onClick={() => formatText(monospaceText)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-mono"
        >
          Monospace
        </button>
        <button
          onClick={() => formatText(strikethroughText)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 line-through"
        >
          Strikethrough
        </button>
        <button
          onClick={() => formatText(underlineText)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 underline"
        >
          Underline
        </button>
        <button
          onClick={() => formatText(bulletList)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          • Bullet List
        </button>
        <button
          onClick={() => formatText(numberedList)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          1. Numbered List
        </button>
        <button
          onClick={() => formatText((text: string) => indentText(text, true))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Indent →
        </button>
        <button
          onClick={() => formatText((text: string) => indentText(text, false))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Unindent
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={copyToClipboard}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-bold"
        >
          Copy Formatted Text
        </button>
        {copySuccess && (
          <span className="ml-4 text-green-600">{copySuccess}</span>
        )}
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">How it works</h2>
        <p className="mb-2">This formatter doesn&apos;t use HTML or markdown. Instead, it uses special Unicode characters that visually appear formatted. This is why the formatting persists when pasted into platforms that don&apos;t support HTML formatting.</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Nested Lists Guide</h3>
        <p className="mb-2">To create nested lists:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Create a normal list (bullet or numbered)</li>
          <li>Select the lines you want to nest</li>
          <li>Click the "Indent →" button to nest them</li>
          <li>Bullet lists will automatically use different bullet styles for each level: • → ◦ → ▪</li>
          <li>Numbered lists will automatically use different numbering styles: 1. → a. → i.</li>
        </ol>

        <p>You can create up to 3 levels of nesting for the best results on social media platforms.</p>
      </div>
    </div>
    </>
  );
};

export default LinkedInTextFormatter;
