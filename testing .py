"""
Bot Detection E2E Test - Local Engine Version
Tests bot detection using local ServerBotDetector engine
No external API required

Usage:
    python tests/e2e/test_bot_detection_local.py
"""

import sys
import os

# Add app to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../..'))

import asyncio
from app.core.identity.engine import DeviceSignature
from app.core.identity.bot_engine import ServerBotDetector, BotVerdict


class LocalBotDetectionTester:
    def __init__(self):
        self.detector = ServerBotDetector()
        self.results = []

    def create_signature(self, scenario: str) -> DeviceSignature:
        """Create test signature based on scenario"""
        
        # Base signature - normal Windows Chrome (with all required fields)
        base_kwargs = {
            # Required fields
            "cpu_cores": 8,
            "ram_gb": 16.0,
            "screen_resolution": "2560x1440",
            "screen_color_depth": 24,
            "pixel_ratio": 1.0,
            "max_touch_points": 0,
            
            # Fingerprint hashes
            "audio_hash": "test_audio_hash",
            "canvas_hash": "test_canvas_hash",
            "canvas_geometry_hash": "test_geo_hash",
            "canvas_text_hash": "test_text_hash",
            "canvas_winding": False,
            "webgl_vendor": "NVIDIA",
            "webgl_renderer": "NVIDIA GeForce RTX 3080",
            "webgl_pixel_hash": "test_pixel_hash",
            "webgl_shader_hash": "test_shader_hash",
            "webgl_params_hash": "test_params_hash",
            "fonts": ["Arial", "Times New Roman"],
            "webrtc_ips": [],
            "media_devices_hash": "test_media_hash",
            "battery_hash": "test_battery_hash",
            
            # Site code
            "site_code": "test",
            
            # Optional fields with defaults
            "timezone": "Asia/Singapore",
            "timezone_offset": 8,
            "languages": ["en-US", "en"],
            "platform": "Win32",
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "browser_family": "Chrome",
            "browser_version": "120.0.0.0",
            "os_family": "Windows",
            "os_version": "10",
            "device_type": "desktop",
            "connection_type": "4g",
            "downlink_mbps": 10.0,
            "rtt_ms": 50,
        }
        
        scenarios = {
            "normal_chrome": {},
            
            "headless_chrome": {
                "headless_browser": True,
            },
            
            "selenium": {
                "webdriver_present": True,
                "headless_browser": True,
                "automation_detected": True,
                "native_functions_overridden": True,
            },
            
            "puppeteer": {
                "automation_detected": True,
                "browser_spoof_detected": True,
                "headless_browser": True,
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            
            "playwright": {
                "automation_detected": True,
                "headless_browser": True,
                "native_functions_overridden": True,
                "suspicious_globals": ["window.cdc_adoQpoasnfa76pfcZLmcfl_Array"],
            },
            
            "spoofed_safari_linux": {
                "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
                "browser_family": "Safari",
                "os_family": "Linux",
                "platform": "Linux x86_64",
                "js_engine": "v8",
                "browser_spoof_detected": True,
            },
            
            "datacenter_ip": {
                "ip_is_datacenter": True,
                "ip_organization": "Amazon.com Inc.",
            },
            
            "tor_exit": {
                "is_tor_exit": True,
                "ip_is_datacenter": True,
            },
            
            "vm_signature": {
                "connection_rtt": 0,
                "battery_is_charging": True,
                "battery_level": 1.0,
                "device_type": "mobile",
            },
            
            "bot_behavior_no_interaction": {
                "mouse_movements": 0,
                "keyboard_events": 0,
                "scroll_events": 0,
                "page_load_ms": 30,
                "time_to_first_interaction_ms": 20,
            },
            
            "vpn_detected": {
                "is_vpn": True,
                "vpn_confidence": 85,
            },
            
            "residential_proxy": {
                "is_residential_proxy": True,
                "ip_organization": "Luminati",
            },
            
            "canvas_timing_instant": {
                "canvas_render_timing_ms": 1,
            },
            
            "mechanical_keystroke": {
                "keystroke_interval_hash": "87_mechanical",
            },
            
            "straight_mouse_line": {
                "mouse_trajectory_hash": "0.5_7",
            },
            
            "low_entropy_behavior": {
                "interaction_entropy": 0.8,
            },
            
            "honeypot_filled": {
                "honeypot_filled": True,
            },
            
            "aws_datacenter": {
                "ip_is_datacenter": True,
                "ip_organization": "Amazon Web Services",
            },
            
            "digitalocean": {
                "ip_is_datacenter": True,
                "ip_organization": "DigitalOcean",
            },
            
            "fake_browser_chrome_linux": {
                "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "browser_family": "Chrome",
                "os_family": "Linux",
                "js_engine": "v8",
                "browser_spoof_detected": True,
            },
        }
        
        scenario_kwargs = scenarios.get(scenario, {})
        all_kwargs = {**base_kwargs, **scenario_kwargs}
        
        return DeviceSignature(**all_kwargs)

    def test_scenario(self, scenario: str, expected_bot: bool, expected_min_score: float) -> dict:
        """Run a single test scenario"""
        print(f"\n{'─'*60}")
        print(f"Testing: {scenario}")
        print(f"{'─'*60}")
        
        try:
            # Create signature
            signature = self.create_signature(scenario)
            
            # Run bot detection
            verdict = self.detector.detect(signature)
            
            # Check results
            passed = (verdict.is_bot == expected_bot) and (verdict.bot_score >= expected_min_score)
            
            print(f"  Bot Score:    {verdict.bot_score:.1f}")
            print(f"  Is Bot:       {verdict.is_bot}")
            print(f"  Bot Kind:     {verdict.bot_kind}")
            print(f"  Confidence:  {verdict.confidence}")
            print(f"  Methods:      {verdict.detection_methods[:5]}...")
            print(f"  Expected:     is_bot={expected_bot}, score>={expected_min_score}")
            print(f"  Result:      {'✅ PASS' if passed else '❌ FAIL'}")
            
            return {
                "scenario": scenario,
                "bot_score": verdict.bot_score,
                "is_bot": verdict.is_bot,
                "bot_kind": verdict.bot_kind,
                "confidence": verdict.confidence,
                "methods": verdict.detection_methods,
                "expected_bot": expected_bot,
                "expected_min": expected_min_score,
                "passed": passed,
                "layer_scores": verdict.layer_scores
            }
            
        except Exception as e:
            print(f"  Error: {e}")
            return {
                "scenario": scenario,
                "error": str(e),
                "passed": False
            }

    def run_all_tests(self):
        """Run all test scenarios"""
        print(f"\n{'#'*70}")
        print(f"# BOT DETECTION E2E TESTS - LOCAL ENGINE")
        print(f"# Testing ServerBotDetector against various scenarios")
        print(f"{'#'*70}")
        
        test_scenarios = [
            # (scenario_name, expected_is_bot, expected_min_score)
            ("normal_chrome", False, 0.0),
            ("headless_chrome", True, 30.0),
            ("selenium", True, 60.0),
            ("puppeteer", True, 50.0),
            ("playwright", True, 50.0),
            ("spoofed_safari_linux", True, 25.0),
            ("datacenter_ip", True, 20.0),
            ("tor_exit", True, 40.0),
            ("vm_signature", True, 15.0),
            ("bot_behavior_no_interaction", True, 15.0),
            ("vpn_detected", True, 10.0),
            ("residential_proxy", True, 35.0),
            ("canvas_timing_instant", True, 20.0),
            ("mechanical_keystroke", True, 25.0),
            ("straight_mouse_line", True, 25.0),
            ("low_entropy_behavior", True, 20.0),
            ("honeypot_filled", True, 50.0),
            ("aws_datacenter", True, 20.0),
            ("digitalocean", True, 20.0),
            ("fake_browser_chrome_linux", True, 20.0),
        ]
        
        for scenario, expected_bot, expected_min in test_scenarios:
            result = self.test_scenario(scenario, expected_bot, expected_min)
            self.results.append(result)
        
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print(f"\n\n{'='*70}")
        print("TEST SUMMARY")
        print(f"{'='*70}")
        
        passed = sum(1 for r in self.results if r.get('passed', False))
        total = len(self.results)
        
        print(f"\n{'Scenario':<30} | {'Score':>6} | {'Bot':>4} | {'Expected':>8} | {'Result'}")
        print(f"{'-'*75}")
        
        for r in self.results:
            status = "✅" if r.get('passed', False) else "❌"
            score = r.get('bot_score', 0)
            is_bot = r.get('is_bot', False)
            expected = r.get('expected_bot', False)
            scenario = r.get('scenario', 'unknown')
            print(f"{scenario:<30} | {score:>6.1f} | {str(is_bot):>4} | {str(expected):>8} | {status}")
        
        print(f"\n{'='*70}")
        print(f"TOTAL: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed!")
        else:
            print(f"⚠️  {total - passed} tests failed")
            
        # Print layer breakdown for some tests
        print(f"\n{'='*70}")
        print("LAYER SCORE BREAKDOWN")
        print(f"{'='*70}")
        
        for r in self.results[:5]:
            if 'layer_scores' in r:
                print(f"\n{r['scenario']}:")
                for layer, score in r['layer_scores'].items():
                    print(f"  {layer}: {score}")
        
        print(f"\n{'='*70}\n")


def main():
    """Main entry point"""
    tester = LocalBotDetectionTester()
    tester.run_all_tests()


if __name__ == "__main__":
    main()