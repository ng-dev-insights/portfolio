import { C } from './colors.js';

export const CODE_SNIPPETS=[
  { label:'RxJS Real-Time Pipeline', color:C.vio, lang:'typescript',
    lines:[
      '// High-frequency WebSocket pipeline aligned to 60fps',
      'const liveQuotes$ = websocket.messages$.pipe(',
      '  // Batch all events within a single animation frame',
      '  bufferTime(16),',
      '  filter(batch => batch.length > 0),',
      '  // Offload heavy transforms to a Web Worker thread',
      '  switchMap(batch => worker.process(batch)),',
      '  // Single shared stream — no duplicate subscriptions',
      '  shareReplay({ bufferSize: 1, refCount: true }),',
      '  takeUntilDestroyed(this.destroyRef)',
      ');',
    ]},
  { label:'Angular OnPush + Signals', color:C.ind, lang:'typescript',
    lines:[
      '@Component({',
      "  selector: 'app-market-tile',",
      '  standalone: true,',
      '  changeDetection: ChangeDetectionStrategy.OnPush,',
      '  template: `',
      '    <div [class.positive]="delta() > 0">',
      '      {{ price() | currency }}',
      '    </div>',
      '  `',
      '})',
      'export class MarketTileComponent {',
      '  // Signal — only triggers CD when value actually changes',
      '  readonly price = input.required<number>();',
      '  readonly delta = computed(() =>',
      '    this.price() - this.prevPrice()',
      '  );',
      '}',
    ]},
  { label:'Circuit Breaker Pattern', color:C.cya, lang:'typescript',
    lines:[
      '// Prevents cascade failures across 15+ services',
      "@Injectable({ providedIn: 'root' })",
      'export class ResilientApiService {',
      '  private readonly breaker = new CircuitBreaker({',
      '    failureThreshold: 3,   // open after 3 failures',
      '    recoveryTimeout: 30000 // retry after 30s',
      '  });',
      '',
      '  fetch<T>(url: string): Observable<T> {',
      '    return this.breaker.execute(() =>',
      '      this.http.get<T>(url).pipe(',
      '        retry({ count: 2, delay: exponentialBackoff }),',
      '        catchError(err => this.fallback<T>(err))',
      '      )',
      '    );',
      '  }',
      '}',
    ]},
  { label:'E2E Matrix · GitHub Actions', color:C.amb, lang:'yaml',
    lines:[
      '# 4 clients x 3 devices = 12 parallel jobs',
      'strategy:',
      '  matrix:',
      '    client: [ten, mastercard, visa-us, visa-cemea]',
      '    device:  [chrome-desktop, iphone-15, pixel-7]',
      '',
      'steps:',
      '  - name: Playwright E2E',
      '    run: npx playwright test --project=$DEVICE',
      '    env:',
      '      CLIENT_CONFIG: $CLIENT',
      '',
      '  # Fan-in gate: ALL 12 must pass to merge',
      '  quality-gate:',
      '    needs: [e2e-matrix]',
      '    if: always()',
      '    run: node scripts/assert-all-passed.js',
    ]},
];

// Syntax highlight a single line of code — pure string ops, no template literals
export function hlLine(line){
  // colour map: tag → hex
  const KW='#c084fc',FN='#38bdf8',ST='#86efac',NM='#fb923c',CM='#6b7280';
  // We build an array of {text, color} spans
  const spans=[];
  // Comment: whole line
  if(/^\s*(\/\/|#)/.test(line)){
    spans.push({t:line,c:CM});
    return spans;
  }
  // Tokenise crudely: split by spaces/punctuation but keep tokens
  let remaining=line;
  const keywords=['const','let','export','class','return','new','if','async','await','private','readonly','this','extends','implements','type','interface'];
  const rxTerms=['Observable','Injectable','Component','ChangeDetectionStrategy','OnPush','Subject','BehaviorSubject','switchMap','bufferTime','filter','shareReplay','takeUntilDestroyed','retry','catchError','computed','input','signal','pipe','map','tap','merge','combineLatest'];

  // Walk through character-by-character grouping
  let i=0;
  while(i<remaining.length){
    // String literals: single or double quote
    if(remaining[i]==='"'||remaining[i]==="'"){
      const q=remaining[i];let j=i+1;
      while(j<remaining.length&&remaining[j]!==q)j++;
      spans.push({t:remaining.slice(i,j+1),c:ST});
      i=j+1;continue;
    }
    // Number
    if(/\d/.test(remaining[i])&&(i===0||!/\w/.test(remaining[i-1]))){
      let j=i;while(j<remaining.length&&/[\d_]/.test(remaining[j]))j++;
      spans.push({t:remaining.slice(i,j),c:NM});
      i=j;continue;
    }
    // Word token
    if(/[a-zA-Z_$]/.test(remaining[i])){
      let j=i;while(j<remaining.length&&/[\w$]/.test(remaining[j]))j++;
      const word=remaining.slice(i,j);
      const c=keywords.includes(word)?KW:rxTerms.includes(word)?FN:'#a5b4fc';
      spans.push({t:word,c});
      i=j;continue;
    }
    // Punctuation / operator — group same char runs
    spans.push({t:remaining[i],c:'#64748b'});
    i++;
  }
  return spans;
}
