1.What the App Does

Shows multiple crypto trading pairs (BTC, ETH, SOL, BNB, XRP, etc.)

Displays:
Trading pair
Last traded price
24h percentage change
Prices update automatically every 2–3 seconds
Prices randomly move up or down slightly
Price text turns:
Green when price goes up
Red when price goes down
Only the price text updates (no full row flashig)
Sorting options:

Sort by Price (High → Low)
Sort by 24h % Change
Sorting continues to work correctly while prices are updating

2.Price Update Logic

A custom hook (usePriceSimulator) is used for simulating price changes
Inside the hook, setInterval runs every ~2.5 seconds.

For each crypto:

A small random delta is applied to the current price
New price is calculated
24h percentage change is recalculated based on price movemen
State updates use the functional form of setState to avoid stale values.

3.How Re-renders Are Minimized

Sorting logic is wrapped in useMemo so it only recalculates when:
Price data changes
Sort option change
Data is updated immutably, allowing React Native to update only what changed.

UI updates are limited to the price text instead of re-rendering the entire list.

The app is split into small components (screen, row, hook, data) to keep rendering efficient and readable.





Tech Stack:->

1.React Native

2.Expo

3.JavaScript

4.React Hooks (useState, useEffect, useMemo)